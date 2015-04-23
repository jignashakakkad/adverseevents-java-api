/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author jignasha
 */
@Embeddable
public class PatientOutcomePK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Column(name = "patient_id")
    private int patientId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "outcome")
    private String outcome;

    public PatientOutcomePK() {
    }

    public PatientOutcomePK(int patientId, String outcome) {
        this.patientId = patientId;
        this.outcome = outcome;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) patientId;
        hash += (outcome != null ? outcome.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PatientOutcomePK)) {
            return false;
        }
        PatientOutcomePK other = (PatientOutcomePK) object;
        if (this.patientId != other.patientId) {
            return false;
        }
        if ((this.outcome == null && other.outcome != null) || (this.outcome != null && !this.outcome.equals(other.outcome))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.PatientOutcomePK[ patientId=" + patientId + ", outcome=" + outcome + " ]";
    }
    
}
