/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.entities;

import java.io.Serializable;
import java.util.Collection;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.engine.internal.JoinHelper;

/**
 *
 * @author jignasha
 */
@Entity
@Table(name = "drug", catalog = "jignasha", schema = "public")
@NamedQueries({
    @NamedQuery(name = "Drug.findAll", query = "SELECT d FROM Drug d"),
    @NamedQuery(name = "Drug.findByAedrugLabel", query = "SELECT d FROM Drug d WHERE d.aedrugLabel = :aedrugLabel"),
    @NamedQuery(name = "Drug.findByAedrugId", query = "SELECT d FROM Drug d WHERE d.aedrugId = :aedrugId")})
public class Drug implements Serializable {
    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "aedrug_label")
    private String aedrugLabel;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "aedrug_id")
    private Integer aedrugId;
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "drug", fetch = FetchType.EAGER)
    private Set<PatientDrug> patientDrugCollection;

    public Drug() {
    }

    public Drug(Integer aedrugId) {
        this.aedrugId = aedrugId;
    }

    public Drug(Integer aedrugId, String aedrugLabel) {
        this.aedrugId = aedrugId;
        this.aedrugLabel = aedrugLabel;
    }

    public String getAedrugLabel() {
        return aedrugLabel;
    }

    public void setAedrugLabel(String aedrugLabel) {
        this.aedrugLabel = aedrugLabel;
    }

    public Integer getAedrugId() {
        return aedrugId;
    }

    public void setAedrugId(Integer aedrugId) {
        this.aedrugId = aedrugId;
    }

    public Set<PatientDrug> getPatientDrugCollection() {
        return patientDrugCollection;
    }

    public void setPatientDrugCollection(Set<PatientDrug> patientDrugCollection) {
        this.patientDrugCollection = patientDrugCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (aedrugId != null ? aedrugId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Drug)) {
            return false;
        }
        Drug other = (Drug) object;
        if ((this.aedrugId == null && other.aedrugId != null) || (this.aedrugId != null && !this.aedrugId.equals(other.aedrugId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Drug[ aedrugId=" + aedrugId + " ]";
    }
    
}
