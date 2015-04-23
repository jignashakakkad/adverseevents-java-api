/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.entities;

import java.io.Serializable;
import javax.persistence.Column;
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
@Table(name = "patient_drug", catalog = "jignasha", schema = "public")
@NamedQueries({
    @NamedQuery(name = "PatientDrug.findAll", query = "SELECT p FROM PatientDrug p"),
    @NamedQuery(name = "PatientDrug.findByPatientId", query = "SELECT p FROM PatientDrug p WHERE p.patientDrugPK.patientId = :patientId"),
    @NamedQuery(name = "PatientDrug.findByAedrugId", query = "SELECT p FROM PatientDrug p WHERE p.patientDrugPK.aedrugId = :aedrugId"),
    @NamedQuery(name = "PatientDrug.findByDrugSequenceInReport", query = "SELECT p FROM PatientDrug p WHERE p.drugSequenceInReport = :drugSequenceInReport")})
public class PatientDrug implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PatientDrugPK patientDrugPK;
    @Column(name = "drug_sequence_in_report")
    private Integer drugSequenceInReport;
    @JoinColumn(name = "patient_id", referencedColumnName = "patient_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Patients patients;
    @JoinColumn(name = "aedrug_id", referencedColumnName = "aedrug_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Drug drug;

    public PatientDrug() {
    }

    public PatientDrug(PatientDrugPK patientDrugPK) {
        this.patientDrugPK = patientDrugPK;
    }

    public PatientDrug(int patientId, int aedrugId) {
        this.patientDrugPK = new PatientDrugPK(patientId, aedrugId);
    }

    public PatientDrugPK getPatientDrugPK() {
        return patientDrugPK;
    }

    public void setPatientDrugPK(PatientDrugPK patientDrugPK) {
        this.patientDrugPK = patientDrugPK;
    }

    public Integer getDrugSequenceInReport() {
        return drugSequenceInReport;
    }

    public void setDrugSequenceInReport(Integer drugSequenceInReport) {
        this.drugSequenceInReport = drugSequenceInReport;
    }

    public Patients getPatients() {
        return patients;
    }

    public void setPatients(Patients patients) {
        this.patients = patients;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (patientDrugPK != null ? patientDrugPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PatientDrug)) {
            return false;
        }
        PatientDrug other = (PatientDrug) object;
        if ((this.patientDrugPK == null && other.patientDrugPK != null) || (this.patientDrugPK != null && !this.patientDrugPK.equals(other.patientDrugPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.PatientDrug[ patientDrugPK=" + patientDrugPK + " ]";
    }
    
}
