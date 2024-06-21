package com.paco.city_explorer_backend.Service.RateLimit;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Aspect
@Component
public class RateLimitAspect {
    private final ConcurrentHashMap<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    @Before("@annotation(rateLimit)")
    public void rateLimitCheck(RateLimit rateLimit) {
        String key = rateLimit.key();
        int capacity = rateLimit.capacity();
        long refillTime = rateLimit.refillTime();

        buckets.computeIfAbsent(key, k -> new TokenBucket(capacity, refillTime)).consume();
    }

}
