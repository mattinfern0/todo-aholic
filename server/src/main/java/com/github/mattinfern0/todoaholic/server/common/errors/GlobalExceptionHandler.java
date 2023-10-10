package com.github.mattinfern0.todoaholic.server.common.errors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({BadCredentialsException.class, AuthenticationException.class})
    public ProblemDetail handleBadCredentials() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationError(MethodArgumentNotValidException err) {
        ProblemDetail res = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation Error");
        res.setProperty("validationErrors", getValidationErrorDetail(err));
        return res;
    }

    @ExceptionHandler(RuntimeException.class)
    public ProblemDetail fallBackHandler(RuntimeException e) {
        logger.error("Internal server error", e);
        ProblemDetail res = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Unknown error");
        res.setProperty("error", e);
        return res;
    }

    public ValidationErrorDetail getValidationErrorDetail(MethodArgumentNotValidException err) {
        List<ObjectError> objectErrors = err.getAllErrors();

        List<ValidationErrorDetaiItem> globalErrors = new ArrayList<>();

        Map<String, List<ValidationErrorDetaiItem>> fieldErrors = new HashMap<>();

        objectErrors.forEach((error) -> {
            ValidationErrorDetaiItem errorDetail = new ValidationErrorDetaiItem();
            errorDetail.setCode(error.getCode());
            errorDetail.setMessage(error.getDefaultMessage());

            if (error instanceof FieldError) {
                String field = ((FieldError) error).getField();
                if (!fieldErrors.containsKey(field)) {
                    fieldErrors.put(field, new ArrayList<>());
                }

                fieldErrors.get(field).add(errorDetail);
            } else {
                globalErrors.add(errorDetail);
            }
        });

        ValidationErrorDetail result = new ValidationErrorDetail();
        result.setGlobal(globalErrors);
        result.setFields(fieldErrors);

        return result;
    }
}
