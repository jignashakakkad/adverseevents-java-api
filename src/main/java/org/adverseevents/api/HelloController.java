package org.adverseevents.api;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import org.adverseevents.service.OutcomesService;
import org.adverseevents.viewobjects.PatientsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    @Autowired
    OutcomesService outcomesService;

    @RequestMapping("/drugs")
    public String getDrugs() {
        System.out.println("1..... ");
        System.out.println("Outcomes Service ::  " + outcomesService);
        System.out.println("2..... ");
        System.out.println("3....." + outcomesService.retrievePrimarySuspectReports());
        return "Hello";
    }

    @RequestMapping("/patientsbydrug/{drugId}")
    public PatientsDTO getPatientsByDrug(@PathVariable(value = "drugId") String drugId) {
        List list = outcomesService.retrievePatientsByDrug(drugId);
        Object[] arr = (Object[]) list.get(0);
        PatientsDTO patientsDTO = new PatientsDTO();
        patientsDTO.setCount((Long) arr[0]);
        patientsDTO.setDrugId((arr[1].toString()));
        return patientsDTO;
    }
}
