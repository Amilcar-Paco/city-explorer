package com.paco.city_explorer_backend.Service.RateLimit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {
    String key();
    int capacity() default 10; // Default capacity of the token bucket
    long refillTime() default 60_000; // Default refill time in milliseconds (1 minute)
}