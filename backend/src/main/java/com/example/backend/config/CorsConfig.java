package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;


//@Configuration class is a source of bean definitions
@Configuration //source for execution of this class
public class CorsConfig {

    @Bean
    //@Bean is used to create instances and can be used to inject in other part of the application without manually creating it
    //WebMvcConfigurer is an interface that allows you to customize the default Spring MVC configuration
    //MVC stands for Model-View-Controller
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //when we call the below api then this class executed first then api
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        //headers are key-value pairs sent along with every request and response like Content-Type, Authorization, origin etc..
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
        //this class tells what are the methods,headers,origins to be allowed 
        //and this is executed when we start the app
    }
}
