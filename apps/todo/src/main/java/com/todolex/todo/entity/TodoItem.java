package com.todolex.todo.entity;
// Generated 7 Feb 2025, 15:04:45 by Hibernate Tools UNKNOWN


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import static jakarta.persistence.GenerationType.IDENTITY;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.sql.Timestamp;

/**
 * TodoItem generated by hbm2java
 */
@Entity
@Table(name="todo_item"
    ,schema="public"
    ,catalog="todo_db"
)
public class TodoItem  implements java.io.Serializable {


     private Long id;
     private String title;
     private String description;
     private boolean completed;
     private Timestamp createdAt;

    public TodoItem() {
    }

	
    public TodoItem(String title, boolean completed, Timestamp createdAt) {
        this.title = title;
        this.completed = completed;
        this.createdAt = createdAt;
    }
    public TodoItem(String title, String description, boolean completed, Timestamp createdAt) {
       this.title = title;
       this.description = description;
       this.completed = completed;
       this.createdAt = createdAt;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="id", unique=true, nullable=false)
    public Long getId() {
        return this.id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    
    @Column(name="title", nullable=false, length=255)
    public String getTitle() {
        return this.title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    
    @Column(name="description")
    public String getDescription() {
        return this.description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    
    @Column(name="completed", nullable=false)
    public boolean isCompleted() {
        return this.completed;
    }
    
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="created_at", nullable=false, length=29)
    public Timestamp getCreatedAt() {
        return this.createdAt;
    }
    
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }




}


