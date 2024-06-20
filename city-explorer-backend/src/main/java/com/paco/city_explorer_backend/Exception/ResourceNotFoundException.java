package com.paco.city_explorer_backend.Exception;

/**
 * ResourceNotFoundException
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}