#include "TRandom.h"
#include <ROOT/REveElement.hxx>
#include <ROOT/REveScene.hxx>
#include <ROOT/REveManager.hxx>
#include <ROOT/REveShower.hxx>
#include <ROOT/REveJetCone.hxx>

#include <cstdio>
#include <fstream>
#include <iostream>
#include <vector>
#include <nlohmann/json.hpp> // For JSON handling
#include <filesystem> // For checking and creating directories

using json = nlohmann::json;

namespace REX = ROOT::Experimental;

REX::REveManager *eveMng = nullptr;
std::vector<G4S_Particle> pvec, *pvec_ptr = &pvec;
TBranch *b = nullptr;

const Double_t kR_min = 240/4;
const Double_t kR_max = 250/4;
const Double_t kZ_d   = 300/4;

void makeGeometryScene()
{
   auto b1 = new REX::REveGeoShape("Barrel 1");
   b1->SetShape(new TGeoTube(kR_min, kR_max, kZ_d));
   b1->SetMainColor(kCyan);
   b1->SetNSegments(80);
   b1->SetMainTransparency(70);
   eveMng->GetEventScene()->AddElement(b1);

   b1->SetNSegments(40);
}

void dump_setup_branch(int event=0)
{
  if (b == nullptr) {
    b = T->GetBranch("p");
    b->SetAddress(&pvec_ptr);
  }
  b->GetEntry(event);
  printf("Loaded event %d, size of particle vector=%d, number of primaries=%d\n",
	       event, (int) pvec.size(), pvec[0].n_daughters());
}

void makeshower(int N_Showers, REX::REveElement *showerHolder, std::vector<double>& trackData, 
std::vector<double>& trackTime, 
std::vector<double>& trackEnergy)
{
   TRandom &r = *gRandom;

   for (int i = 0; i < N_Showers; i++)
   {
      auto shower = new REX::REveShower(Form("Shower_%d", i), "", trackData, trackTime, trackEnergy, 100, 0.04, 0, 30, 100);
      shower->SetFillColor(kPink - 8);
      shower->SetLineColor(kViolet - 7);

      showerHolder->AddElement(shower);
   }
}

void shower()
{
   eveMng = REX::REveManager::Create();
   eveMng->AllowMultipleRemoteConnections(false, false);

   int n_events = T->GetEntriesFast();

   // Directory where you want the JSON files to be saved (relative to the current path)
   std::filesystem::path currentPath = std::filesystem::current_path();
   std::string directory = currentPath.parent_path().parent_path().parent_path().parent_path().string() + "/ui5/eve7/lib/data/";

   // Check if directory exists, if not create it
   if (!std::filesystem::exists(directory)) {
       std::cout << "Directory does not exist. Attempting to create directory: " << directory << std::endl;
       std::filesystem::create_directories(directory);
       if (std::filesystem::exists(directory)) {
           std::cout << "Directory created successfully!" << std::endl;
       } else {
           std::cerr << "Failed to create directory." << std::endl;
           return; // Exit if directory creation fails
       }
   } else {
       std::cout << "Directory exists: " << directory << std::endl;
   }

   for (int e = 0; e < n_events; ++e)
   {
       json outputJson; 
       dump_setup_branch(e);

       int size = (int) pvec.size();
       printf("data %d\n", size);

       // Min and max for energy and time for this event
       double minEnergy = std::numeric_limits<double>::max();
       double maxEnergy = std::numeric_limits<double>::min();
       double minTime = std::numeric_limits<double>::max();
       double maxTime = std::numeric_limits<double>::min();

       // Particle JSON initialization
       for (int i = 0; i < size; ++i)
       {
           json particleJson;

           std::vector<double> trackData;
           std::vector<double> trackTime;
           std::vector<double> trackEnergy;

           // Min and max for each of the 12 entries
           double minVals[12], maxVals[12];

           // Initialize min and max to first element
           minVals[0] = maxVals[0] = pvec[0].m_x_beg.fX;
           minVals[1] = maxVals[1] = pvec[0].m_x_beg.fY;
           minVals[2] = maxVals[2] = pvec[0].m_x_beg.fZ;

           minVals[3] = maxVals[3] = pvec[0].m_p_beg.fX;
           minVals[4] = maxVals[4] = pvec[0].m_p_beg.fY;
           minVals[5] = maxVals[5] = pvec[0].m_p_beg.fZ;

           minVals[6] = maxVals[6] = pvec[0].m_x_end.fX;
           minVals[7] = maxVals[7] = pvec[0].m_x_end.fY;
           minVals[8] = maxVals[8] = pvec[0].m_x_end.fZ;

           minVals[9]  = maxVals[9]  = pvec[0].m_p_end.fX;
           minVals[10] = maxVals[10] = pvec[0].m_p_end.fY;
           minVals[11] = maxVals[11] = pvec[0].m_p_end.fZ;

           // Find min and max for each entry and energy/time
           for (const auto& entry : pvec) {
               minVals[0] = 0.0;
               maxVals[0] = 1.0;
               minVals[1] = 0.0;
               maxVals[1] = 1.0;
               minVals[2] = 0.0;
               maxVals[2] = 1.0;

               minVals[3] = std::min<double>(minVals[3], entry.m_p_beg.fX);
               maxVals[3] = std::max<double>(maxVals[3], entry.m_p_beg.fX);

               minVals[4] = std::min<double>(minVals[4], entry.m_p_beg.fY);
               maxVals[4] = std::max<double>(maxVals[4], entry.m_p_beg.fY);

               minVals[5] = std::min<double>(minVals[5], entry.m_p_beg.fZ);
               maxVals[5] = std::max<double>(maxVals[5], entry.m_p_beg.fZ);

               minVals[6] = 0.0;
               maxVals[6] = 1.0;

               minVals[7] = 0.0;
               maxVals[7] = 1.0;

               minVals[8] = 0.0;
               maxVals[8] = 1.0;

               minVals[9]  = std::min<double>(minVals[9], entry.m_p_end.fX);
               maxVals[9]  = std::max<double>(maxVals[9], entry.m_p_end.fX);

               minVals[10] = std::min<double>(minVals[10], entry.m_p_end.fY);
               maxVals[10] = std::max<double>(maxVals[10], entry.m_p_end.fY);

               minVals[11] = std::min<double>(minVals[11], entry.m_p_end.fZ);
               maxVals[11] = std::max<double>(maxVals[11], entry.m_p_end.fZ);

               // Energy and Time calculations
               minEnergy = std::min(minEnergy, entry.m_p_beg.fT);
               maxEnergy = std::max(maxEnergy, entry.m_p_beg.fT);
               minEnergy = std::min(minEnergy, entry.m_p_end.fT);
               maxEnergy = std::max(maxEnergy, entry.m_p_end.fT);
               
               minTime = std::min(minTime, entry.m_x_beg.fT);
               maxTime = std::max(maxTime, entry.m_x_beg.fT);
               minTime = std::min(minTime, entry.m_x_end.fT);
               maxTime = std::max(maxTime, entry.m_x_end.fT);
           }

           // Particle data to JSON object
           particleJson["charge"] = pvec[i].m_charge;
           particleJson["color"] = {"#f707ab"}; // You can replace this with actual color data
           particleJson["energy_beg"] = pvec[i].m_p_beg.fT;
           particleJson["energy_end"] = pvec[i].m_p_end.fT;
           particleJson["id"] = i;
           if(pvec[i].m_parent != -1) {
            particleJson["parent"] = pvec[i].m_parent;
           }
           particleJson["level"] = pvec[i].m_g4_level;
           particleJson["mass"] = pvec[i].m_mass;
           particleJson["name"] = i;
           particleJson["pdg"] = pvec[i].m_pdg;

           // Positions
           particleJson["position_beg"] = {
               (pvec[i].m_x_beg.fX - pvec[1].m_x_beg.fX),
               (pvec[i].m_x_beg.fY - pvec[1].m_x_beg.fY),
               (pvec[i].m_x_beg.fZ - pvec[1].m_x_beg.fZ) 
           };

           particleJson["position_end"] = {
               (pvec[i].m_x_end.fX - pvec[1].m_x_end.fX),
               (pvec[i].m_x_end.fY - pvec[1].m_x_end.fY),
               (pvec[i].m_x_end.fZ - pvec[1].m_x_end.fZ)
           };

           // Size, tangents, time, etc.
           particleJson["size"] = 1983;
           particleJson["tangent_beg"] = {
               (pvec[i].m_p_beg.fX),
               (pvec[i].m_p_beg.fY),
               (pvec[i].m_p_beg.fZ)
           };

           particleJson["tangent_end"] = {
               (pvec[i].m_p_end.fX),
               (pvec[i].m_p_end.fY),
               (pvec[i].m_p_end.fZ)
           };

           particleJson["time_beg"] = pvec[i].m_x_beg.fT;
           particleJson["time_end"] = pvec[i].m_x_end.fT;
           particleJson["tracked"] = pvec[i].m_was_tracked;
           particleJson["z"] = pvec[i].m_x_beg.fZ;

           // Add the particle data to the main JSON array
           outputJson.push_back(particleJson);
       }

       // Create a new JSON file for each event
       std::string filename = directory + "output_event_" + std::to_string(e) + ".json";
       std::ofstream file(filename);
       if (file.is_open()) {
           file << outputJson.dump(4);  // Pretty print with 4 spaces
           file.close();
       } else {
           std::cerr << "Failed to open file for writing: " << filename << std::endl;
       }
       
       // Create header JSON with min and max energy and time
       json headerJson;
       headerJson["min"] = minTime;
       headerJson["max"] = maxTime;
       headerJson["minE"] = minEnergy;
       headerJson["maxE"] = maxEnergy;

       std::string headerFilename = directory + "output_event_" + std::to_string(e) + "_header.json";
       std::ofstream headerFile(headerFilename);
       if (headerFile.is_open()) {
           headerFile << headerJson.dump(4);  // Pretty print with 4 spaces
           headerFile.close();
       } else {
           std::cerr << "Failed to open header file for writing: " << headerFilename << std::endl;
       }
   }

   eveMng->Show();
}
