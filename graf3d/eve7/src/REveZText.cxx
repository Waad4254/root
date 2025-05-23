// @(#)root/eve7:$Id$
// Author: Waad Alshehri, 2023

/*************************************************************************
 * Copyright (C) 1995-2019, Rene Brun and Fons Rademakers.               *
 * All rights reserved.                                                  *
 *                                                                       *
 * For the licensing terms see $ROOTSYS/LICENSE.                         *
 * For the list of contributors see $ROOTSYS/README/CREDITS.             *
 *************************************************************************/


#include <ROOT/REveZText.hxx>
#include <ROOT/REveTrans.hxx>
#include <ROOT/REveRenderData.hxx>

#include "TMath.h"
#include "TClass.h"

#include <cassert>

#include <nlohmann/json.hpp>

using namespace ROOT::Experimental;

////////////////////////////////////////////////////////////////////////////////
/// Constructor.

REveZText::REveZText(const Text_t* n, const Text_t* t) :
   REveShape(n, t)
{
   fPickable  = true;
   fFontColor = kGreen;
   fFillColor = kGreen;
}

////////////////////////////////////////////////////////////////////////////////
/// Fill core part of JSON representation.

Int_t REveZText::WriteCoreJson(nlohmann::json &t, Int_t rnr_offset)
{
   Int_t ret = REveElement::WriteCoreJson(t, rnr_offset);

   t["fMainColor"] = GetFillColor();
   t["fLineColor"] = GetLineColor();

   t["fFontHinting"] = GetFontHinting();
   t["fMode"] = GetMode();
   t["fFontSize"] = GetFontSize();
   t["fText"] = GetText();
   t["fFontColor"] = GetFontColor();
   t["fFont"] = GetFont();
   REveVector pos = GetPosition();
   t["fPosX"] = pos.fX;
   t["fPosY"] = pos.fY;
   t["fPosZ"] = pos.fZ;
   t["fScreenW"] = GetScreenWidth();
   t["fScreenH"] = GetScreenHeight();

   return ret;
}

////////////////////////////////////////////////////////////////////////////////
/// Crates 3D point array for rendering.

void REveZText::BuildRenderData()
{

printf("ZText build render data \n");
fRenderData = std::make_unique<REveRenderData>("makeZText");

// TODO write fPosition and fFontSize here ...
fRenderData->PushV(0.f, 0.f, 0.f); // frite floats so the data is not empty

}

////////////////////////////////////////////////////////////////////////////////
/// Compute bounding-box of the data.

void REveZText::ComputeBBox()
{
   //BBoxInit();
}
