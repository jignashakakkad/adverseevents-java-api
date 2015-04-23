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
import javax.validation.constraints.Size;

/**
 *
 * @author jignasha
 */
@Entity
@Table(name = "patient_event", catalog = "jignasha", schema = "public")
@NamedQueries({
    @NamedQuery(name = "PatientEvent.findAll", query = "SELECT p FROM PatientEvent p"),
    @NamedQuery(name = "PatientEvent.findByPatientId", query = "SELECT p FROM PatientEvent p WHERE p.patientEventPK.patientId = :patientId"),
    @NamedQuery(name = "PatientEvent.findByEventId", query = "SELECT p FROM PatientEvent p WHERE p.patientEventPK.eventId = :eventId"),
    @NamedQuery(name = "PatientEvent.findByEventName", query = "SELECT p FROM PatientEvent p WHERE p.eventName = :eventName")})
public class PatientEvent implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected PatientEventPK patientEventPK;
    @Size(max = 2147483647)
    @Column(name = "event_name")
    private String eventName;
    @JoinColumn(name = "patient_id", referencedColumnName = "patient_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Patients patients;

    public PatientEvent() {
    }

    public PatientEvent(PatientEventPK patientEventPK) {
        this.patientEventPK = patientEventPK;
    }

    public PatientEvent(int patientId, int eventId) {
        this.patientEventPK = new PatientEventPK(patientId, eventId);
    }

    public PatientEventPK getPatientEventPK() {
        return patientEventPK;
    }

    public void setPatientEventPK(PatientEventPK patientEventPK) {
        this.patientEventPK = patientEventPK;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
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
        hash += (patientEventPK != null ? patientEventPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PatientEvent)) {
            return false;
        }
        PatientEvent other = (PatientEvent) object;
        if ((this.patientEventPK == null && other.patientEventPK != null) || (this.patientEventPK != null && !this.patientEventPK.equals(other.patientEventPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.PatientEvent[ patientEventPK=" + patientEventPK + " ]";
    }
    
}
