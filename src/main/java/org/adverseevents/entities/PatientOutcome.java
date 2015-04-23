/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.entities;

import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author jignasha
 */
@Entity
@Table(name = "patient_outcome", catalog = "jignasha", schema = "public")
@NamedQueries({
    @NamedQuery(name = "PatientOutcome.findAll", query = "SELECT p FROM PatientOutcome p"),
    @NamedQuery(name = "PatientOutcome.findByPatientId", query = "SELECT p FROM PatientOutcome p WHERE p.patientOutcomePK.patientId = :patientId"),
    @NamedQuery(name = "PatientOutcome.findByOutcome", query = "SELECT p FROM PatientOutcome p WHERE p.patientOutcomePK.outcome = :outcome")})
public class PatientOutcome implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PatientOutcomePK patientOutcomePK;
    @JoinColumn(name = "patient_id", referencedColumnName = "patient_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Patients patients;

    public PatientOutcome() {
    }

    public PatientOutcome(PatientOutcomePK patientOutcomePK) {
        this.patientOutcomePK = patientOutcomePK;
    }

    public PatientOutcome(int patientId, String outcome) {
        this.patientOutcomePK = new PatientOutcomePK(patientId, outcome);
    }

    public PatientOutcomePK getPatientOutcomePK() {
        return patientOutcomePK;
    }

    public void setPatientOutcomePK(PatientOutcomePK patientOutcomePK) {
        this.patientOutcomePK = patientOutcomePK;
    }

    public Patients getPatients() {
        return patients;
    }

    public void setPatients(Patients patients) {
        this.patients = patients;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (patientOutcomePK != null ? patientOutcomePK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PatientOutcome)) {
            return false;
        }
        PatientOutcome other = (PatientOutcome) object;
        if ((this.patientOutcomePK == null && other.patientOutcomePK != null) || (this.patientOutcomePK != null && !this.patientOutcomePK.equals(other.patientOutcomePK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.PatientOutcome[ patientOutcomePK=" + patientOutcomePK + " ]";
    }
    
}
