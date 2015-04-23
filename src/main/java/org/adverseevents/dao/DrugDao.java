/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.dao;

import org.adverseevents.entities.Drug;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author jignasha
 */
@Repository
@Transactional
public class DrugDao {

    @Autowired
    private SessionFactory _sessionFactory;

    private Session getSession() {
        return _sessionFactory.openSession();
    }
    
    public List<Drug> getAllDrugs(){
        Session session = _sessionFactory.openSession();
        List list = session.createCriteria(Drug.class).list();
        session.close();
        return list;
    }
    
   
}
