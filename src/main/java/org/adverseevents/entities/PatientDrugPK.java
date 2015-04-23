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

/**
 *
 * @author jignasha
 */
@Embeddable
public class PatientDrugPK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Column(name = "patient_id")
    private int patientId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "aedrug_id")
    private int aedrugId;

    public PatientDrugPK() {
    }

    public PatientDrugPK(int patientId, int aedrugId) {
        this.patientId = patientId;
        this.aedrugId = aedrugId;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public int getAedrugId() {
        return aedrugId;
    }

    public void setAedrugId(int aedrugId) {
        this.aedrugId = aedrugId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) patientId;
        hash += (int) aedrugId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PatientDrugPK)) {
            return false;
        }
        PatientDrugPK other = (PatientDrugPK) object;
        if (this.patientId != other.patientId) {
            return false;
        }
        if (this.aedrugId != other.aedrugId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.PatientDrugPK[ patientId=" + patientId + ", aedrugId=" + aedrugId + " ]";
    }
    
}
