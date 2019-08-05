package com.yuhgi.learn.springboot.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    @ConfigurationProperties(prefix = "another")
    public ServerConfig serverConfig(){
        return new ServerConfig();
    }
}
