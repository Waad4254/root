// @(#)root/eve7:$Id$
// Author: Waad Alshehri 2024

/*************************************************************************
 * Copyright (C) 1995-2019, Rene Brun and Fons Rademakers.               *
 * All rights reserved.                                                  *
 *                                                                       *
 * For the licensing terms see $ROOTSYS/LICENSE.                         *
 * For the list of contributors see $ROOTSYS/README/CREDITS.             *
 *************************************************************************/

#ifndef ROOT7_REveShower
#define ROOT7_REveShower

#include <ROOT/REveShape.hxx>
#include <ROOT/REveVector.hxx>

namespace ROOT {
namespace Experimental {

//------------------------------------------------------------------------------
// REveShower
//------------------------------------------------------------------------------

class REveShower : public REveShape
{

private:
   REveShower(const REveShower &) = delete;
   REveShower &operator=(const REveShower &) = delete;

protected:

   Int_t fNDiv;
   Double_t fTrackWidth;
   Double_t fSamples;
   Double_t fMinTime;
   Double_t fMaxTime;
   Int_t fLevel;
   std::vector<Double_t> fPoints;
   std::vector<Double_t> fTime;
   std::vector<Double_t> fEnergy;



public:
   REveShower(const Text_t *n = "REveShower", const Text_t *t = "");

   REveShower(const Text_t *n = "REveShower", const Text_t *t = "", 
   std::vector<Double_t> p = {},
   std::vector<Double_t> time = {},
   std::vector<Double_t> e = {},
   Double_t s = 100,
   Double_t w = 0.01,
   Double_t minT = 0,
   Double_t maxT = 30,
   Int_t l = 100);


   ~REveShower() override {}

   Int_t WriteCoreJson(nlohmann::json &j, Int_t rnr_offset) override;
   void BuildRenderData() override;

   void ComputeBBox() override;

   Int_t GetNDiv() const { return fNDiv; }
   void SetNDiv(Int_t n);

   Int_t GetLevel() const { return fLevel; }
   void SetLevel(Int_t l) { fLevel = l;}

   Double_t GetSamples() const { return fSamples; }
   void SetSamples(Double_t s) { fSamples = s;}

   Double_t GetTrackWidth() const { return fTrackWidth; }
   void SetTrackWidth(Double_t w) { fTrackWidth = w;}

   Double_t GetMinTime() const { return fMinTime; }
   void SetMinTime(Double_t minT) {fMinTime = minT;}

   Double_t GetMaxTime() const { return fMaxTime; }
   void SetMaxTime(Double_t maxT) {fMaxTime = maxT;}

   std::vector<Double_t> GetPoints() const { return fPoints; }
   void SetPoints(std::vector<Double_t> p) { fPoints = p;}

   std::vector<Double_t> GetTime() const { return fTime; }
   void SetTime(std::vector<Double_t> t) { fTime = t;}

   std::vector<Double_t> GetEnergy() const { return fEnergy; }
   void SetEnergy(std::vector<Double_t> e) { fEnergy = e;}


};

} // namespace Experimental
} // namespace ROOT

#endif
