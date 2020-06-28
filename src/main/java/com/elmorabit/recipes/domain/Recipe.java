package com.elmorabit.recipes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "image")
    private String image;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "recipe")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Ingredient> ingredients = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "recipes", allowSetters = true)
    private Author author;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Recipe title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public Recipe image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public Recipe description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Ingredient> getIngredients() {
        return ingredients;
    }

    public Recipe ingredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
        return this;
    }

    public Recipe addIngredients(Ingredient ingredient) {
        this.ingredients.add(ingredient);
        ingredient.setRecipe(this);
        return this;
    }

    public Recipe removeIngredients(Ingredient ingredient) {
        this.ingredients.remove(ingredient);
        ingredient.setRecipe(null);
        return this;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Author getAuthor() {
        return author;
    }

    public Recipe author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recipe)) {
            return false;
        }
        return id != null && id.equals(((Recipe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", image='" + getImage() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
