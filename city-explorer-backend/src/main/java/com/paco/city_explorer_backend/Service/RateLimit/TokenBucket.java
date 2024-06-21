package com.paco.city_explorer_backend.Service.RateLimit;

public class TokenBucket {

    private final int capacity;
    private final long refillTime;
    private long lastRefillTimestamp;
    private int tokens;

    public TokenBucket(int capacity, long refillTime) {
        this.capacity = capacity;
        this.refillTime = refillTime;
        this.tokens = capacity;
        this.lastRefillTimestamp = System.currentTimeMillis();
    }

    public synchronized void consume() {
        refillTokens();
        if (tokens == 0) {
            throw new RuntimeException("Rate limit exceeded");
        }
        tokens--;
    }

    private synchronized void refillTokens() {
        long currentTime = System.currentTimeMillis();
        long elapsedTime = currentTime - lastRefillTimestamp;
        int tokensToAdd = (int) (elapsedTime / refillTime);
        tokens = Math.min(capacity, tokens + tokensToAdd);
        lastRefillTimestamp = currentTime;
    }
}