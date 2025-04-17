// @(#)root/eve7:$Id$
// Author: Matevz Tadel, Jochen Thaeder 2009, 2018

/*************************************************************************
 * Copyright (C) 1995-2019, Rene Brun and Fons Rademakers.               *
 * All rights reserved.                                                  *
 *                                                                       *
 * For the licensing terms see $ROOTSYS/LICENSE.                         *
 * For the list of contributors see $ROOTSYS/README/CREDITS.             *
 *************************************************************************/

#include <ROOT/REveShower.hxx>
#include <ROOT/REveTrans.hxx>
#include <ROOT/REveRenderData.hxx>

#include "TMath.h"
#include "TClass.h"

#include <cassert>

#include <nlohmann/json.hpp>

using namespace ROOT::Experimental;

////////////////////////////////////////////////////////////////////////////////
/// Constructor.

REveShower::REveShower(const Text_t* n, const Text_t* t) :
   REveShape(n, t),
    fNDiv(36)
{
   fPickable  = true;
   fFillColor = kGreen;
}

////////////////////////////////////////////////////////////////////////////////
/// Constructor.

REveShower::REveShower(const Text_t* n, const Text_t* t, 
   std::vector<Double_t> p,
   std::vector<Double_t> time,
   std::vector<Double_t> e,
   Double_t s,
   Double_t w,
   Double_t minT,
   Double_t maxT,
   Int_t l) :
    REveShape(n, t),
    fPoints(p),
    fTime(time),
    fEnergy(e),
    fSamples(s),
    fTrackWidth(w),
    fMinTime(minT),
    fMaxTime(maxT),
    fLevel(l),
    fNDiv(36)
{
   fPickable  = true;
   fFillColor = kGreen;
}

////////////////////////////////////////////////////////////////////////////////
/// Set Number of Divisions
////////////////////////////////////////////////////////////////////////////////
void  REveShower::SetNDiv(Int_t n)
{
   fNDiv = TMath::Max(4, n);
   if (fNDiv % 4 > 0) { fNDiv += 4 - fNDiv % 4; };
}


////////////////////////////////////////////////////////////////////////////////
/// Fill core part of JSON representation.

Int_t REveShower::WriteCoreJson(nlohmann::json &j, Int_t rnr_offset)
{
   Int_t ret = REveElement::WriteCoreJson(j, rnr_offset);

   /*Int_t fNDiv;
   Double_t fTrackWidth;
   Double_t fSamples;
   Double_t fMinTime;
   Double_t fMaxTime;
   Int_t fLevel;
   std::vector<Double_t> fPoints;
   std::vector<Double_t> fTime;
   std::vector<Double_t> fEnergy;*/
   j["fMainColor"] = GetFillColor();
   j["fLineColor"] = GetLineColor();
   j["fNDiv"] = GetNDiv();
   j["fTrackWidth"] = GetTrackWidth();
   j["fSamples"] = GetSamples();
   j["fMinTime"] = GetMinTime();
   j["fMaxTime"] = GetMaxTime();
   j["fLevel"] = GetLevel();

   j["fPoints"] = GetPoints();
   j["fTime"] = GetTime();
   j["fEnergy"] = GetEnergy();

   return ret;
}
  
////////////////////////////////////////////////////////////////////////////////
/// Crates 3D point array for rendering.

void REveShower::BuildRenderData()
{

   fRenderData = std::make_unique<REveRenderData>("makeShower", 3 * 1);

   fRenderData->PushV(0.f, 0.f, 0.f); // frite floats so the data is not empty

}

////////////////////////////////////////////////////////////////////////////////
/// Compute bounding-box of the data.

void REveShower::ComputeBBox()
{
   
}



