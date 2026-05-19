package com.questio.questio_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class QuestioBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuestioBackendApplication.class, args);
	}

}
