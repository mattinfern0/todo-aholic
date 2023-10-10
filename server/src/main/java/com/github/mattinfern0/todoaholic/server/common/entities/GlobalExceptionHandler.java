package com.github.mattinfern0.todoaholic.server.common.entities;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({BadCredentialsException.class, AuthenticationException.class})
    public ProblemDetail handleBadCredentials() {
        return ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationError(MethodArgumentNotValidException err) {
        ProblemDetail res = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation Error");
        return res;
    }

    @ExceptionHandler(RuntimeException.class)
    public ProblemDetail fallBackHandler(RuntimeException e) {
        logger.error("Internal server error", e);
        ProblemDetail res = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Unknown error");
        res.setProperty("error", e);
        return res;
    }
}
