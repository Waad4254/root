#include <iostream>

#include "TString.h"
#include "TFile.h"
#include "TTree.h"
#include "TSystem.h"
#include "TMVA/Factory.h"
#include "TMVA/Reader.h"
#include "TMVA/DataLoader.h"
#include "TMVA/PyMethodBase.h"

TString pythonSrc = "\
from tensorflow.keras.models import Sequential\n\
from tensorflow.keras.layers import Dense, Activation\n\
from tensorflow.keras.optimizers import Adam\n\
\n\
model = Sequential()\n\
model.add(Dense(64, activation=\"relu\", input_dim=4))\n\
model.add(Dense(2, activation=\"softmax\"))\n\
model.compile(loss=\"categorical_crossentropy\", optimizer=\"Adam\", weighted_metrics=[\"accuracy\",])\n\
model.save(\"kerasModelClassification.h5\")\n";

int testPyKerasClassification(){

   // Get data file
   std::cout << "Get test data..." << std::endl;
   TString fname = "./tmva_class_example.root";
   if (gSystem->AccessPathName(fname))  // file does not exist in local directory
      gSystem->Exec("curl -L -O http://root.cern.ch/files/tmva_class_example.root");
   TFile *input = TFile::Open(fname);

   // Build model from python file
   if (gSystem->AccessPathName("kerasModelClassification.h5")) {
      std::cout << "Generate keras model..." << std::endl;
      UInt_t ret;
      ret = gSystem->Exec("echo '"+pythonSrc+"' > generateKerasModelClassification.py");
      if(ret!=0){
         std::cout << "[ERROR] Failed to write python code to file" << std::endl;
         return 1;
      }
      ret = gSystem->Exec(TMVA::Python_Executable() + " generateKerasModelClassification.py");
      if(ret!=0){
         std::cout << "[ERROR] Failed to generate model using python" << std::endl;
         return 1;
      }
   }
   // Setup PyMVA and factory
   std::cout << "Setup TMVA..." << std::endl;
   TMVA::PyMethodBase::PyInitialize();
   TFile* outputFile = TFile::Open("ResultsTestPyKerasClassification.root", "RECREATE");
   TMVA::Factory *factory = new TMVA::Factory("testPyKerasClassification", outputFile,
      "!V:Silent:Color:!DrawProgressBar:AnalysisType=Classification");

   // Load data
   TMVA::DataLoader *dataloader = new TMVA::DataLoader("datasetTestPyKerasClassification");

   TTree *signal = (TTree*)input->Get("TreeS");
   TTree *background = (TTree*)input->Get("TreeB");
   dataloader->AddSignalTree(signal);
   dataloader->AddBackgroundTree(background);

   dataloader->AddVariable("var1");
   dataloader->AddVariable("var2");
   dataloader->AddVariable("var3");
   dataloader->AddVariable("var4");

   dataloader->PrepareTrainingAndTestTree("",
      "SplitMode=Random:NormMode=NumEvents:!V");

   // Book and train method
   factory->BookMethod(dataloader, TMVA::Types::kPyKeras, "PyKeras",
      "!H:!V:VarTransform=D,G:FilenameModel=kerasModelClassification.h5:FilenameTrainedModel=trainedKerasModelClassification.h5:NumEpochs=10:BatchSize=32:SaveBestOnly=false:Verbose=0:NumThreads=1:tf.keras");
   std::cout << "Train model..." << std::endl;
   factory->TrainAllMethods();

   // Clean-up
   delete factory;
   delete dataloader;
   delete outputFile;

   // Setup reader
   UInt_t numEvents = 100;
   std::cout << "Run reader and classify " << numEvents << " events..." << std::endl;
   TMVA::Reader *reader = new TMVA::Reader("!Color:Silent");
   Float_t vars[4];
   reader->AddVariable("var1", vars+0);
   reader->AddVariable("var2", vars+1);
   reader->AddVariable("var3", vars+2);
   reader->AddVariable("var4", vars+3);
   std::cout << "Booking PyKeras for TMVA::Reader\n";
   reader->BookMVA("PyKeras", "datasetTestPyKerasClassification/weights/testPyKerasClassification_PyKeras.weights.xml");

   // Get mean response of method on signal and background events
   signal->SetBranchAddress("var1", vars+0);
   signal->SetBranchAddress("var2", vars+1);
   signal->SetBranchAddress("var3", vars+2);
   signal->SetBranchAddress("var4", vars+3);

   background->SetBranchAddress("var1", vars+0);
   background->SetBranchAddress("var2", vars+1);
   background->SetBranchAddress("var3", vars+2);
   background->SetBranchAddress("var4", vars+3);

   Float_t meanMvaSignal = 0;
   Float_t meanMvaBackground = 0;
   std::cout << "Reading events....\n";
   for(UInt_t i=0; i<numEvents; i++){
      signal->GetEntry(i);
      meanMvaSignal += reader->EvaluateMVA("PyKeras");
      background->GetEntry(i);
      meanMvaBackground += reader->EvaluateMVA("PyKeras");
   }
   meanMvaSignal = meanMvaSignal/float(numEvents);
   meanMvaBackground = meanMvaBackground/float(numEvents);

   // Check whether the response is obviously better than guessing
   std::cout << "Mean MVA response on signal: " << meanMvaSignal << std::endl;
   if(meanMvaSignal < 0.6){
      std::cout << "[ERROR] Mean response on signal is " << meanMvaSignal << " (<0.6)" << std::endl;
      return 1;
   }
   std::cout << "Mean MVA response on background: " << meanMvaBackground << std::endl;
   if(meanMvaBackground > 0.4){
      std::cout << "[ERROR] Mean response on background is " << meanMvaBackground << " (>0.4)" << std::endl;
      return 1;
   }

   return 0;
}

int main(){
   int err = testPyKerasClassification();
   return err;
}
