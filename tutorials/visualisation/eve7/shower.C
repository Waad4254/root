/// \file
/// \ingroup tutorial_eve7
///  This example display only points in web browser
///
/// \macro_code
///

#include "TRandom.h"
#include <ROOT/REveElement.hxx>
#include <ROOT/REveScene.hxx>
#include <ROOT/REveManager.hxx>
#include <ROOT/REveShower.hxx>


namespace REX = ROOT::Experimental;

TFile *f = nullptr;
TTree *T = nullptr;

void loader(const char *fname="Mix500-0.5-20GeV-origin.root")
{
  gSystem->Load("libRootG4Snitch.so");
  f = TFile::Open(fname);
  T = (TTree*) f->Get("T");

  // Need two-level initialization as dictionaries need to be loaded before
  // processing of code that uses G4S types.
  //gROOT->LoadMacro("dumper.C");
  //gROOT->LoadMacro("tracksList.C");
}

void makeshower(int N_Showers, REX::REveElement *showerHolder)
{
   TRandom &r = *gRandom;

   for (int i = 0; i < N_Showers; i++)
   {
      auto shower = new REX::REveShower(Form("Shower_%d", i), "", {}, {}, {}, 100, 0.01, 0, 30, 100);
      shower->SetFillColor(kPink - 8);
      shower->SetLineColor(kViolet - 7);

      showerHolder->AddElement(shower);
   }
}

void shower()
{
   auto eveMng = REX::REveManager::Create();
   eveMng->AllowMultipleRemoteConnections(false, false);

   loader("SinglePhoton-200GeV.root");

   REX::REveElement *showerHolder = new REX::REveElement("Showers");
   eveMng->GetEventScene()->AddElement(showerHolder);
   makeshower(1, showerHolder);

   eveMng->Show();
}
