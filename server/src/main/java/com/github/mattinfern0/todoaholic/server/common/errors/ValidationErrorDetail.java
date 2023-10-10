package com.github.mattinfern0.todoaholic.server.common.errors;

import java.util.List;
import java.util.Map;

public class ValidationErrorDetail {
    private List<ValidationErrorDetaiItem> global;

    private Map<String, List<ValidationErrorDetaiItem>> fields;

    public List<ValidationErrorDetaiItem> getGlobal() {
        return global;
    }

    public void setGlobal(List<ValidationErrorDetaiItem> global) {
        this.global = global;
    }

    public Map<String, List<ValidationErrorDetaiItem>> getFields() {
        return fields;
    }

    public void setFields(Map<String, List<ValidationErrorDetaiItem>> fields) {
        this.fields = fields;
    }
}
