package com.elmorabit.recipes.service;

import com.elmorabit.recipes.domain.Ingredient;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Ingredient}.
 */
public interface IngredientService {

    /**
     * Save a ingredient.
     *
     * @param ingredient the entity to save.
     * @return the persisted entity.
     */
    Ingredient save(Ingredient ingredient);

    /**
     * Get all the ingredients.
     *
     * @return the list of entities.
     */
    List<Ingredient> findAll();


    /**
     * Get the "id" ingredient.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Ingredient> findOne(Long id);

    /**
     * Delete the "id" ingredient.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
