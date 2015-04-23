package org.adverseevents.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"org.adverseevents.api", "org.adverseevents.dao", "org.adverseevents.service"})
@EnableAutoConfiguration
@SpringBootApplication
public class AdverseEventsApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdverseEventsApiApplication.class, args);
    }
}
