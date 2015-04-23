/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.adverseevents.viewobjects.PatientsDTO;

/**
 *
 * @author jignasha
 */
@Entity
@Table(name = "patients", catalog = "jignasha", schema = "public")
@NamedQueries({
    @NamedQuery(name = "Patients.findAll", query = "SELECT p FROM Patients p"),
    @NamedQuery(name = "Patients.findByPatientId", query = "SELECT p FROM Patients p WHERE p.patientId = :patientId"),
    @NamedQuery(name = "Patients.findByPatientReportDate", query = "SELECT p FROM Patients p WHERE p.patientReportDate = :patientReportDate")})
public class Patients implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "patient_id")
    private Integer patientId;
    @Column(name = "patient_report_date")
    @Temporal(TemporalType.DATE)
    private Date patientReportDate;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patients", fetch = FetchType.LAZY)
    private Set<PatientEvent> patientEventCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patients", fetch = FetchType.LAZY)
    private Set<PatientDrug> patientDrugCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patients", fetch = FetchType.LAZY)
    private Set<PatientOutcome> patientOutcomeCollection;

    public Patients() {
    }

    public Patients(Integer patientId) {
        this.patientId = patientId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Date getPatientReportDate() {
        return patientReportDate;
    }

    public void setPatientReportDate(Date patientReportDate) {
        this.patientReportDate = patientReportDate;
    }

    public Set<PatientEvent> getPatientEventCollection() {
        return patientEventCollection;
    }

    public void setPatientEventCollection(Set<PatientEvent> patientEventCollection) {
        this.patientEventCollection = patientEventCollection;
    }

    public Set<PatientDrug> getPatientDrugCollection() {
        return patientDrugCollection;
    }

    public void setPatientDrugCollection(Set<PatientDrug> patientDrugCollection) {
        this.patientDrugCollection = patientDrugCollection;
    }

    public Set<PatientOutcome> getPatientOutcomeCollection() {
        return patientOutcomeCollection;
    }

    public void setPatientOutcomeCollection(Set<PatientOutcome> patientOutcomeCollection) {
        this.patientOutcomeCollection = patientOutcomeCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (patientId != null ? patientId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Patients)) {
            return false;
        }
        Patients other = (Patients) object;
        if ((this.patientId == null && other.patientId != null) || (this.patientId != null && !this.patientId.equals(other.patientId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Patients[ patientId=" + patientId + " ]";
    }
    
    public PatientsDTO toDto(Patients p){
        PatientsDTO patientDTO = new PatientsDTO();
        return patientDTO;
    }
    
}
