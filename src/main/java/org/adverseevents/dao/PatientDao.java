/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.dao;

import org.adverseevents.entities.Patients;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author jignasha
 */
@Repository
@Transactional
public class PatientDao {

    @Autowired
    @XmlElement()
    private SessionFactory _sessionFactory;

    private Session getSession() {
        String query = "SELECT COUNT(DISTINCT patient_id) FROM patient p JOIN patient_drug d ON p.patient_id = d.patient_id WHERE drug_sequence_in_report = 1 AND d.aedrug_id = 28";
        return _sessionFactory.openSession();
    }

    public List getPatientOutcomesByDrug(String drugId) {
        List<Patients> patients;
        Session session = getSession();
//        DetachedCriteria criteriaObjective
//                = DetachedCriteria.forClass(Patients.class);
//        criteriaObjective.createCriteria("patientDrugCollection", JoinType.INNER_JOIN)
//        .add(Restrictions.eq("personid", "XXXX"));
        System.out.println("Drug Id .. " + drugId);
        System.out.println("Integer Drug Id .. " + new Integer(drugId));
        List results = session.createCriteria(Patients.class)
                .createAlias("patientDrugCollection", "pd", JoinType.INNER_JOIN)
                .add(Restrictions.and(Restrictions.eq("pd.patientDrugPK.aedrugId", new Integer(drugId)), Restrictions.eq("pd.drugSequenceInReport", 1)))
                .setProjection(Projections.projectionList()
                        .add(Projections.rowCount())
                        .add(Property.forName("pd.patientDrugPK.aedrugId"))
                        .add(Projections.groupProperty("pd.patientDrugPK.aedrugId")))
                .setResultTransformer(CriteriaSpecification.PROJECTION)
                .list();
        System.out.println("Results are ..." + results.size());
        Object[] arr = (Object[]) results.get(0);
        System.out.println("Arr is .. " + arr[0]);
        session.close();
        return results;
    }

}
