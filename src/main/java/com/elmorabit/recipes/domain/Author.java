package com.elmorabit.recipes.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Author.
 */
@Entity
@Table(name = "author")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Author implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "website")
    private String website;

    @OneToMany(mappedBy = "author")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Recipe> recipes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Author name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebsite() {
        return website;
    }

    public Author website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public Author recipes(Set<Recipe> recipes) {
        this.recipes = recipes;
        return this;
    }

    public Author addRecipes(Recipe recipe) {
        this.recipes.add(recipe);
        recipe.setAuthor(this);
        return this;
    }

    public Author removeRecipes(Recipe recipe) {
        this.recipes.remove(recipe);
        recipe.setAuthor(null);
        return this;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Author)) {
            return false;
        }
        return id != null && id.equals(((Author) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Author{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", website='" + getWebsite() + "'" +
            "}";
    }
}
