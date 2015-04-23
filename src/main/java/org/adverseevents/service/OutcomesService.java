/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.service;

import org.adverseevents.dao.DrugDao;
import org.adverseevents.dao.PatientDao;
import org.adverseevents.entities.Drug;
import org.adverseevents.entities.Patients;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jignasha
 */
@Service
public class OutcomesService {

    @Autowired
    private DrugDao drugDao;
    
    @Autowired
    private PatientDao patientDao;

    public List<Drug> retrievePrimarySuspectReports() {
        return drugDao.getAllDrugs();
//        System.out.println("1.............................");
//        final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//        // Create criteria query and pass the value object which needs to be populated as result
//        final CriteriaQuery criteriaQuery = criteriaBuilder.createQuery(DrugVO.class);
//        final Root drugRoot = criteriaQuery.from(Drug.class);
//        final Root patientRoot = criteriaQuery.from(Patients.class);
//        System.out.println("2.............................");
//        // This list will contain all Predicates (where clauses)
//        List criteriaList = new ArrayList();
//
//        Predicate[] p = new Predicate[2];
//        Predicate predicate1 = criteriaBuilder.equal(
//                patientRoot.get("patientDrugCollection").get("patientDrugPK.aedrugId"),
//                drugId);
//        criteriaList.add(predicate1);
//        p[0] = predicate1;
//        Predicate predicate2 = criteriaBuilder.equal(
//                patientRoot.get("patientDrugCollection").get("drugSequenceInReport"),
//                1);
//        System.out.println("3.............................");
//        criteriaList.add(predicate2);
//        p[1] = predicate2;
//        criteriaQuery.select(criteriaBuilder.construct(DrugVO.class, patientRoot.get("patientDrugCollection").get("patientDrugPK.aedrugId"),
//                patientRoot.get("drug").get("aedrugLabel")));
//        criteriaQuery.where(criteriaBuilder.and(p));
//        System.out.println("4.............................");
//        final TypedQuery query = entityManager.createQuery(criteriaQuery);
//        List l = query.getResultList();
//        System.out.println("List is .... " + l);
//        System.out.println("List is .... " + l.size());
//        return l;

    }
    
    public List<Patients> retrievePatientsByDrug(String drugId){
        return patientDao.getPatientOutcomesByDrug(drugId);
    }
}
