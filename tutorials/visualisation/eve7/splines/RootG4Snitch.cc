// Do NOT change. Changes will be lost next time file is generated

#define R__DICTIONARY_FILENAME RootG4Snitch
#define R__NO_DEPRECATION

/*******************************************************************/
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#define G__DICTIONARY
#include "ROOT/RConfig.hxx"
#include "TClass.h"
#include "TDictAttributeMap.h"
#include "TInterpreter.h"
#include "TROOT.h"
#include "TBuffer.h"
#include "TMemberInspector.h"
#include "TInterpreter.h"
#include "TVirtualMutex.h"
#include "TError.h"

#ifndef G__ROOT
#define G__ROOT
#endif

#include "RtypesImp.h"
#include "TIsAProxy.h"
#include "TFileMergeInfo.h"
#include <algorithm>
#include "TCollectionProxyInfo.h"
/*******************************************************************/

#include "TDataMember.h"

// Header files passed as explicit arguments
#include "G4SnitchDataFormat.h"

// Header files passed via #pragma extra_include

// The generated code does not explicitly qualify STL entities
namespace std {} using namespace std;

namespace ROOT {
   static TClass *G4S_Info_Dictionary();
   static void G4S_Info_TClassManip(TClass*);
   static void *new_G4S_Info(void *p = nullptr);
   static void *newArray_G4S_Info(Long_t size, void *p);
   static void delete_G4S_Info(void *p);
   static void deleteArray_G4S_Info(void *p);
   static void destruct_G4S_Info(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const ::G4S_Info*)
   {
      ::G4S_Info *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(::G4S_Info));
      static ::ROOT::TGenericClassInfo 
         instance("G4S_Info", "G4SnitchDataFormat.h", 10,
                  typeid(::G4S_Info), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &G4S_Info_Dictionary, isa_proxy, 4,
                  sizeof(::G4S_Info) );
      instance.SetNew(&new_G4S_Info);
      instance.SetNewArray(&newArray_G4S_Info);
      instance.SetDelete(&delete_G4S_Info);
      instance.SetDeleteArray(&deleteArray_G4S_Info);
      instance.SetDestructor(&destruct_G4S_Info);
      return &instance;
   }
   TGenericClassInfo *GenerateInitInstance(const ::G4S_Info*)
   {
      return GenerateInitInstanceLocal(static_cast<::G4S_Info*>(nullptr));
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const ::G4S_Info*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *G4S_Info_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const ::G4S_Info*>(nullptr))->GetClass();
      G4S_Info_TClassManip(theClass);
   return theClass;
   }

   static void G4S_Info_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   static TClass *G4S_Particle_Dictionary();
   static void G4S_Particle_TClassManip(TClass*);
   static void *new_G4S_Particle(void *p = nullptr);
   static void *newArray_G4S_Particle(Long_t size, void *p);
   static void delete_G4S_Particle(void *p);
   static void deleteArray_G4S_Particle(void *p);
   static void destruct_G4S_Particle(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const ::G4S_Particle*)
   {
      ::G4S_Particle *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(::G4S_Particle));
      static ::ROOT::TGenericClassInfo 
         instance("G4S_Particle", "G4SnitchDataFormat.h", 29,
                  typeid(::G4S_Particle), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &G4S_Particle_Dictionary, isa_proxy, 4,
                  sizeof(::G4S_Particle) );
      instance.SetNew(&new_G4S_Particle);
      instance.SetNewArray(&newArray_G4S_Particle);
      instance.SetDelete(&delete_G4S_Particle);
      instance.SetDeleteArray(&deleteArray_G4S_Particle);
      instance.SetDestructor(&destruct_G4S_Particle);
      return &instance;
   }
   TGenericClassInfo *GenerateInitInstance(const ::G4S_Particle*)
   {
      return GenerateInitInstanceLocal(static_cast<::G4S_Particle*>(nullptr));
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const ::G4S_Particle*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *G4S_Particle_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const ::G4S_Particle*>(nullptr))->GetClass();
      G4S_Particle_TClassManip(theClass);
   return theClass;
   }

   static void G4S_Particle_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   static TClass *G4S_EDep_Dictionary();
   static void G4S_EDep_TClassManip(TClass*);
   static void *new_G4S_EDep(void *p = nullptr);
   static void *newArray_G4S_EDep(Long_t size, void *p);
   static void delete_G4S_EDep(void *p);
   static void deleteArray_G4S_EDep(void *p);
   static void destruct_G4S_EDep(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const ::G4S_EDep*)
   {
      ::G4S_EDep *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(::G4S_EDep));
      static ::ROOT::TGenericClassInfo 
         instance("G4S_EDep", "G4SnitchDataFormat.h", 81,
                  typeid(::G4S_EDep), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &G4S_EDep_Dictionary, isa_proxy, 4,
                  sizeof(::G4S_EDep) );
      instance.SetNew(&new_G4S_EDep);
      instance.SetNewArray(&newArray_G4S_EDep);
      instance.SetDelete(&delete_G4S_EDep);
      instance.SetDeleteArray(&deleteArray_G4S_EDep);
      instance.SetDestructor(&destruct_G4S_EDep);
      return &instance;
   }
   TGenericClassInfo *GenerateInitInstance(const ::G4S_EDep*)
   {
      return GenerateInitInstanceLocal(static_cast<::G4S_EDep*>(nullptr));
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const ::G4S_EDep*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *G4S_EDep_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const ::G4S_EDep*>(nullptr))->GetClass();
      G4S_EDep_TClassManip(theClass);
   return theClass;
   }

   static void G4S_EDep_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   static TClass *G4S_Step_Dictionary();
   static void G4S_Step_TClassManip(TClass*);
   static void *new_G4S_Step(void *p = nullptr);
   static void *newArray_G4S_Step(Long_t size, void *p);
   static void delete_G4S_Step(void *p);
   static void deleteArray_G4S_Step(void *p);
   static void destruct_G4S_Step(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const ::G4S_Step*)
   {
      ::G4S_Step *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(::G4S_Step));
      static ::ROOT::TGenericClassInfo 
         instance("G4S_Step", "G4SnitchDataFormat.h", 100,
                  typeid(::G4S_Step), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &G4S_Step_Dictionary, isa_proxy, 4,
                  sizeof(::G4S_Step) );
      instance.SetNew(&new_G4S_Step);
      instance.SetNewArray(&newArray_G4S_Step);
      instance.SetDelete(&delete_G4S_Step);
      instance.SetDeleteArray(&deleteArray_G4S_Step);
      instance.SetDestructor(&destruct_G4S_Step);
      return &instance;
   }
   TGenericClassInfo *GenerateInitInstance(const ::G4S_Step*)
   {
      return GenerateInitInstanceLocal(static_cast<::G4S_Step*>(nullptr));
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const ::G4S_Step*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *G4S_Step_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const ::G4S_Step*>(nullptr))->GetClass();
      G4S_Step_TClassManip(theClass);
   return theClass;
   }

   static void G4S_Step_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   static TClass *G4S_ParticleSteps_Dictionary();
   static void G4S_ParticleSteps_TClassManip(TClass*);
   static void *new_G4S_ParticleSteps(void *p = nullptr);
   static void *newArray_G4S_ParticleSteps(Long_t size, void *p);
   static void delete_G4S_ParticleSteps(void *p);
   static void deleteArray_G4S_ParticleSteps(void *p);
   static void destruct_G4S_ParticleSteps(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const ::G4S_ParticleSteps*)
   {
      ::G4S_ParticleSteps *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(::G4S_ParticleSteps));
      static ::ROOT::TGenericClassInfo 
         instance("G4S_ParticleSteps", "G4SnitchDataFormat.h", 117,
                  typeid(::G4S_ParticleSteps), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &G4S_ParticleSteps_Dictionary, isa_proxy, 4,
                  sizeof(::G4S_ParticleSteps) );
      instance.SetNew(&new_G4S_ParticleSteps);
      instance.SetNewArray(&newArray_G4S_ParticleSteps);
      instance.SetDelete(&delete_G4S_ParticleSteps);
      instance.SetDeleteArray(&deleteArray_G4S_ParticleSteps);
      instance.SetDestructor(&destruct_G4S_ParticleSteps);
      return &instance;
   }
   TGenericClassInfo *GenerateInitInstance(const ::G4S_ParticleSteps*)
   {
      return GenerateInitInstanceLocal(static_cast<::G4S_ParticleSteps*>(nullptr));
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const ::G4S_ParticleSteps*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *G4S_ParticleSteps_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const ::G4S_ParticleSteps*>(nullptr))->GetClass();
      G4S_ParticleSteps_TClassManip(theClass);
   return theClass;
   }

   static void G4S_ParticleSteps_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   // Wrappers around operator new
   static void *new_G4S_Info(void *p) {
      return  p ? new(p) ::G4S_Info : new ::G4S_Info;
   }
   static void *newArray_G4S_Info(Long_t nElements, void *p) {
      return p ? new(p) ::G4S_Info[nElements] : new ::G4S_Info[nElements];
   }
   // Wrapper around operator delete
   static void delete_G4S_Info(void *p) {
      delete (static_cast<::G4S_Info*>(p));
   }
   static void deleteArray_G4S_Info(void *p) {
      delete [] (static_cast<::G4S_Info*>(p));
   }
   static void destruct_G4S_Info(void *p) {
      typedef ::G4S_Info current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class ::G4S_Info

namespace ROOT {
   // Wrappers around operator new
   static void *new_G4S_Particle(void *p) {
      return  p ? new(p) ::G4S_Particle : new ::G4S_Particle;
   }
   static void *newArray_G4S_Particle(Long_t nElements, void *p) {
      return p ? new(p) ::G4S_Particle[nElements] : new ::G4S_Particle[nElements];
   }
   // Wrapper around operator delete
   static void delete_G4S_Particle(void *p) {
      delete (static_cast<::G4S_Particle*>(p));
   }
   static void deleteArray_G4S_Particle(void *p) {
      delete [] (static_cast<::G4S_Particle*>(p));
   }
   static void destruct_G4S_Particle(void *p) {
      typedef ::G4S_Particle current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class ::G4S_Particle

namespace ROOT {
   // Wrappers around operator new
   static void *new_G4S_EDep(void *p) {
      return  p ? new(p) ::G4S_EDep : new ::G4S_EDep;
   }
   static void *newArray_G4S_EDep(Long_t nElements, void *p) {
      return p ? new(p) ::G4S_EDep[nElements] : new ::G4S_EDep[nElements];
   }
   // Wrapper around operator delete
   static void delete_G4S_EDep(void *p) {
      delete (static_cast<::G4S_EDep*>(p));
   }
   static void deleteArray_G4S_EDep(void *p) {
      delete [] (static_cast<::G4S_EDep*>(p));
   }
   static void destruct_G4S_EDep(void *p) {
      typedef ::G4S_EDep current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class ::G4S_EDep

namespace ROOT {
   // Wrappers around operator new
   static void *new_G4S_Step(void *p) {
      return  p ? new(p) ::G4S_Step : new ::G4S_Step;
   }
   static void *newArray_G4S_Step(Long_t nElements, void *p) {
      return p ? new(p) ::G4S_Step[nElements] : new ::G4S_Step[nElements];
   }
   // Wrapper around operator delete
   static void delete_G4S_Step(void *p) {
      delete (static_cast<::G4S_Step*>(p));
   }
   static void deleteArray_G4S_Step(void *p) {
      delete [] (static_cast<::G4S_Step*>(p));
   }
   static void destruct_G4S_Step(void *p) {
      typedef ::G4S_Step current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class ::G4S_Step

namespace ROOT {
   // Wrappers around operator new
   static void *new_G4S_ParticleSteps(void *p) {
      return  p ? new(p) ::G4S_ParticleSteps : new ::G4S_ParticleSteps;
   }
   static void *newArray_G4S_ParticleSteps(Long_t nElements, void *p) {
      return p ? new(p) ::G4S_ParticleSteps[nElements] : new ::G4S_ParticleSteps[nElements];
   }
   // Wrapper around operator delete
   static void delete_G4S_ParticleSteps(void *p) {
      delete (static_cast<::G4S_ParticleSteps*>(p));
   }
   static void deleteArray_G4S_ParticleSteps(void *p) {
      delete [] (static_cast<::G4S_ParticleSteps*>(p));
   }
   static void destruct_G4S_ParticleSteps(void *p) {
      typedef ::G4S_ParticleSteps current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class ::G4S_ParticleSteps

namespace ROOT {
   static TClass *vectorlEG4S_StepgR_Dictionary();
   static void vectorlEG4S_StepgR_TClassManip(TClass*);
   static void *new_vectorlEG4S_StepgR(void *p = nullptr);
   static void *newArray_vectorlEG4S_StepgR(Long_t size, void *p);
   static void delete_vectorlEG4S_StepgR(void *p);
   static void deleteArray_vectorlEG4S_StepgR(void *p);
   static void destruct_vectorlEG4S_StepgR(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const vector<G4S_Step>*)
   {
      vector<G4S_Step> *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(vector<G4S_Step>));
      static ::ROOT::TGenericClassInfo 
         instance("vector<G4S_Step>", -2, "vector", 428,
                  typeid(vector<G4S_Step>), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &vectorlEG4S_StepgR_Dictionary, isa_proxy, 4,
                  sizeof(vector<G4S_Step>) );
      instance.SetNew(&new_vectorlEG4S_StepgR);
      instance.SetNewArray(&newArray_vectorlEG4S_StepgR);
      instance.SetDelete(&delete_vectorlEG4S_StepgR);
      instance.SetDeleteArray(&deleteArray_vectorlEG4S_StepgR);
      instance.SetDestructor(&destruct_vectorlEG4S_StepgR);
      instance.AdoptCollectionProxyInfo(TCollectionProxyInfo::Generate(TCollectionProxyInfo::Pushback< vector<G4S_Step> >()));

      instance.AdoptAlternate(::ROOT::AddClassAlternate("vector<G4S_Step>","std::vector<G4S_Step, std::allocator<G4S_Step> >"));
      return &instance;
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const vector<G4S_Step>*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *vectorlEG4S_StepgR_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const vector<G4S_Step>*>(nullptr))->GetClass();
      vectorlEG4S_StepgR_TClassManip(theClass);
   return theClass;
   }

   static void vectorlEG4S_StepgR_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   // Wrappers around operator new
   static void *new_vectorlEG4S_StepgR(void *p) {
      return  p ? ::new(static_cast<::ROOT::Internal::TOperatorNewHelper*>(p)) vector<G4S_Step> : new vector<G4S_Step>;
   }
   static void *newArray_vectorlEG4S_StepgR(Long_t nElements, void *p) {
      return p ? ::new(static_cast<::ROOT::Internal::TOperatorNewHelper*>(p)) vector<G4S_Step>[nElements] : new vector<G4S_Step>[nElements];
   }
   // Wrapper around operator delete
   static void delete_vectorlEG4S_StepgR(void *p) {
      delete (static_cast<vector<G4S_Step>*>(p));
   }
   static void deleteArray_vectorlEG4S_StepgR(void *p) {
      delete [] (static_cast<vector<G4S_Step>*>(p));
   }
   static void destruct_vectorlEG4S_StepgR(void *p) {
      typedef vector<G4S_Step> current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class vector<G4S_Step>

namespace ROOT {
   static TClass *vectorlEG4S_ParticleStepsgR_Dictionary();
   static void vectorlEG4S_ParticleStepsgR_TClassManip(TClass*);
   static void *new_vectorlEG4S_ParticleStepsgR(void *p = nullptr);
   static void *newArray_vectorlEG4S_ParticleStepsgR(Long_t size, void *p);
   static void delete_vectorlEG4S_ParticleStepsgR(void *p);
   static void deleteArray_vectorlEG4S_ParticleStepsgR(void *p);
   static void destruct_vectorlEG4S_ParticleStepsgR(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const vector<G4S_ParticleSteps>*)
   {
      vector<G4S_ParticleSteps> *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(vector<G4S_ParticleSteps>));
      static ::ROOT::TGenericClassInfo 
         instance("vector<G4S_ParticleSteps>", -2, "vector", 428,
                  typeid(vector<G4S_ParticleSteps>), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &vectorlEG4S_ParticleStepsgR_Dictionary, isa_proxy, 4,
                  sizeof(vector<G4S_ParticleSteps>) );
      instance.SetNew(&new_vectorlEG4S_ParticleStepsgR);
      instance.SetNewArray(&newArray_vectorlEG4S_ParticleStepsgR);
      instance.SetDelete(&delete_vectorlEG4S_ParticleStepsgR);
      instance.SetDeleteArray(&deleteArray_vectorlEG4S_ParticleStepsgR);
      instance.SetDestructor(&destruct_vectorlEG4S_ParticleStepsgR);
      instance.AdoptCollectionProxyInfo(TCollectionProxyInfo::Generate(TCollectionProxyInfo::Pushback< vector<G4S_ParticleSteps> >()));

      instance.AdoptAlternate(::ROOT::AddClassAlternate("vector<G4S_ParticleSteps>","std::vector<G4S_ParticleSteps, std::allocator<G4S_ParticleSteps> >"));
      return &instance;
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const vector<G4S_ParticleSteps>*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *vectorlEG4S_ParticleStepsgR_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const vector<G4S_ParticleSteps>*>(nullptr))->GetClass();
      vectorlEG4S_ParticleStepsgR_TClassManip(theClass);
   return theClass;
   }

   static void vectorlEG4S_ParticleStepsgR_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   // Wrappers around operator new
   static void *new_vectorlEG4S_ParticleStepsgR(void *p) {
      return  p ? ::new(static_cast<::ROOT::Internal::TOperatorNewHelper*>(p)) vector<G4S_ParticleSteps> : new vector<G4S_ParticleSteps>;
   }
   static void *newArray_vectorlEG4S_ParticleStepsgR(Long_t nElements, void *p) {
      return p ? ::new(static_cast<::ROOT::Internal::TOperatorNewHelper*>(p)) vector<G4S_ParticleSteps>[nElements] : new vector<G4S_ParticleSteps>[nElements];
   }
   // Wrapper around operator delete
   static void delete_vectorlEG4S_ParticleStepsgR(void *p) {
      delete (static_cast<vector<G4S_ParticleSteps>*>(p));
   }
   static void deleteArray_vectorlEG4S_ParticleStepsgR(void *p) {
      delete [] (static_cast<vector<G4S_ParticleSteps>*>(p));
   }
   static void destruct_vectorlEG4S_ParticleStepsgR(void *p) {
      typedef vector<G4S_ParticleSteps> current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class vector<G4S_ParticleSteps>

namespace ROOT {
   static TClass *vectorlEG4S_ParticlegR_Dictionary();
   static void vectorlEG4S_ParticlegR_TClassManip(TClass*);
   static void *new_vectorlEG4S_ParticlegR(void *p = nullptr);
   static void *newArray_vectorlEG4S_ParticlegR(Long_t size, void *p);
   static void delete_vectorlEG4S_ParticlegR(void *p);
   static void deleteArray_vectorlEG4S_ParticlegR(void *p);
   static void destruct_vectorlEG4S_ParticlegR(void *p);

   // Function generating the singleton type initializer
   static TGenericClassInfo *GenerateInitInstanceLocal(const vector<G4S_Particle>*)
   {
      vector<G4S_Particle> *ptr = nullptr;
      static ::TVirtualIsAProxy* isa_proxy = new ::TIsAProxy(typeid(vector<G4S_Particle>));
      static ::ROOT::TGenericClassInfo 
         instance("vector<G4S_Particle>", -2, "vector", 428,
                  typeid(vector<G4S_Particle>), ::ROOT::Internal::DefineBehavior(ptr, ptr),
                  &vectorlEG4S_ParticlegR_Dictionary, isa_proxy, 4,
                  sizeof(vector<G4S_Particle>) );
      instance.SetNew(&new_vectorlEG4S_ParticlegR);
      instance.SetNewArray(&newArray_vectorlEG4S_ParticlegR);
      instance.SetDelete(&delete_vectorlEG4S_ParticlegR);
      instance.SetDeleteArray(&deleteArray_vectorlEG4S_ParticlegR);
      instance.SetDestructor(&destruct_vectorlEG4S_ParticlegR);
      instance.AdoptCollectionProxyInfo(TCollectionProxyInfo::Generate(TCollectionProxyInfo::Pushback< vector<G4S_Particle> >()));

      instance.AdoptAlternate(::ROOT::AddClassAlternate("vector<G4S_Particle>","std::vector<G4S_Particle, std::allocator<G4S_Particle> >"));
      return &instance;
   }
   // Static variable to force the class initialization
   static ::ROOT::TGenericClassInfo *_R__UNIQUE_DICT_(Init) = GenerateInitInstanceLocal(static_cast<const vector<G4S_Particle>*>(nullptr)); R__UseDummy(_R__UNIQUE_DICT_(Init));

   // Dictionary for non-ClassDef classes
   static TClass *vectorlEG4S_ParticlegR_Dictionary() {
      TClass* theClass =::ROOT::GenerateInitInstanceLocal(static_cast<const vector<G4S_Particle>*>(nullptr))->GetClass();
      vectorlEG4S_ParticlegR_TClassManip(theClass);
   return theClass;
   }

   static void vectorlEG4S_ParticlegR_TClassManip(TClass* ){
   }

} // end of namespace ROOT

namespace ROOT {
   // Wrappers around operator new
   static void *new_vectorlEG4S_ParticlegR(void *p) {
      return  p ? ::new(static_cast<::ROOT::Internal::TOperatorNewHelper*>(p)) vector<G4S_Particle> : new vector<G4S_Particle>;
   }
   static void *newArray_vectorlEG4S_ParticlegR(Long_t nElements, void *p) {
      return p ? ::new(static_cast<::ROOT::Internal::TOperatorNewHelper*>(p)) vector<G4S_Particle>[nElements] : new vector<G4S_Particle>[nElements];
   }
   // Wrapper around operator delete
   static void delete_vectorlEG4S_ParticlegR(void *p) {
      delete (static_cast<vector<G4S_Particle>*>(p));
   }
   static void deleteArray_vectorlEG4S_ParticlegR(void *p) {
      delete [] (static_cast<vector<G4S_Particle>*>(p));
   }
   static void destruct_vectorlEG4S_ParticlegR(void *p) {
      typedef vector<G4S_Particle> current_t;
      (static_cast<current_t*>(p))->~current_t();
   }
} // end of namespace ROOT for class vector<G4S_Particle>

namespace ROOT {
   // Registration Schema evolution read functions
   int RecordReadRules_RootG4Snitch() {
      return 0;
   }
   static int _R__UNIQUE_DICT_(ReadRules_RootG4Snitch) = RecordReadRules_RootG4Snitch();R__UseDummy(_R__UNIQUE_DICT_(ReadRules_RootG4Snitch));
} // namespace ROOT
namespace {
  void TriggerDictionaryInitialization_RootG4Snitch_Impl() {
    static const char* headers[] = {
"G4SnitchDataFormat.h",
nullptr
    };
    static const char* includePaths[] = {
"/home/alshehwf/CMS/root-bld/include/",
"/home/alshehwf/CMS/root/tutorials/visualisation/eve7/splines/",
nullptr
    };
    static const char* fwdDeclCode = R"DICTFWDDCLS(
#line 1 "RootG4Snitch dictionary forward declarations' payload"
#pragma clang diagnostic ignored "-Wkeyword-compat"
#pragma clang diagnostic ignored "-Wignored-attributes"
#pragma clang diagnostic ignored "-Wreturn-type-c-linkage"
extern int __Cling_AutoLoading_Map;
struct __attribute__((annotate("$clingAutoload$G4SnitchDataFormat.h")))  G4S_Step;
namespace std{template <typename _Tp> class __attribute__((annotate("$clingAutoload$bits/allocator.h")))  __attribute__((annotate("$clingAutoload$string")))  allocator;
}
struct __attribute__((annotate("$clingAutoload$G4SnitchDataFormat.h")))  G4S_ParticleSteps;
struct __attribute__((annotate("$clingAutoload$G4SnitchDataFormat.h")))  G4S_Particle;
struct __attribute__((annotate("$clingAutoload$G4SnitchDataFormat.h")))  G4S_Info;
struct __attribute__((annotate("$clingAutoload$G4SnitchDataFormat.h")))  G4S_EDep;
)DICTFWDDCLS";
    static const char* payloadCode = R"DICTPAYLOAD(
#line 1 "RootG4Snitch dictionary payload"


#define _BACKWARD_BACKWARD_WARNING_H
// Inline headers
#include "G4SnitchDataFormat.h"

#undef  _BACKWARD_BACKWARD_WARNING_H
)DICTPAYLOAD";
    static const char* classesHeaders[] = {
"G4S_EDep", payloadCode, "@",
"G4S_Info", payloadCode, "@",
"G4S_Particle", payloadCode, "@",
"G4S_ParticleSteps", payloadCode, "@",
"G4S_Step", payloadCode, "@",
nullptr
};
    static bool isInitialized = false;
    if (!isInitialized) {
      TROOT::RegisterModule("RootG4Snitch",
        headers, includePaths, payloadCode, fwdDeclCode,
        TriggerDictionaryInitialization_RootG4Snitch_Impl, {}, classesHeaders, /*hasCxxModule*/false);
      isInitialized = true;
    }
  }
  static struct DictInit {
    DictInit() {
      TriggerDictionaryInitialization_RootG4Snitch_Impl();
    }
  } __TheDictionaryInitializer;
}
void TriggerDictionaryInitialization_RootG4Snitch() {
  TriggerDictionaryInitialization_RootG4Snitch_Impl();
}
