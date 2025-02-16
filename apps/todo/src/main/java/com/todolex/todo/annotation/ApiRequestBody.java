package com.todolex.todo.annotation;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.core.annotation.AliasFor;

import io.swagger.v3.oas.annotations.extensions.Extension;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RequestBody
@Target({ METHOD, PARAMETER, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiRequestBody {

    @AliasFor(annotation = RequestBody.class, attribute = "description")
    String description() default "";

    @AliasFor(annotation = RequestBody.class, attribute = "content")
    Content[] content() default {};

    @AliasFor(annotation = RequestBody.class, attribute = "required")
    boolean required() default false;

    @AliasFor(annotation = RequestBody.class, attribute = "extensions")
    Extension[] extensions() default {};

    @AliasFor(annotation = RequestBody.class, attribute = "ref")
    String ref() default "";

    @AliasFor(annotation = RequestBody.class, attribute = "useParameterTypeSchema")
    boolean useParameterTypeSchema() default false;

}
