/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.adverseevents.viewobjects;

/**
 *
 * @author jignasha
 */
public class DrugVO {
    
    private Long aedrugId;
    private String aedrugLabel;
    private Long primarySuspectReport;

    public DrugVO(Long aedrugId, String aedrugLabel) {
        this.aedrugId = aedrugId;
        this.aedrugLabel = aedrugLabel;
    }
    
    public Long getAedrugId() {
        return aedrugId;
    }

    public void setAedrugId(Long aedrugId) {
        this.aedrugId = aedrugId;
    }

    public String getAedrugLabel() {
        return aedrugLabel;
    }

    public void setAedrugLabel(String aedrugLabel) {
        this.aedrugLabel = aedrugLabel;
    }

    public Long getPrimarySuspectReport() {
        return primarySuspectReport;
    }

    public void setPrimarySuspectReport(Long primarySuspectReport) {
        this.primarySuspectReport = primarySuspectReport;
    }

    
    
}
