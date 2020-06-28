package com.elmorabit.recipes.service.impl;

import com.elmorabit.recipes.service.IngredientService;
import com.elmorabit.recipes.domain.Ingredient;
import com.elmorabit.recipes.repository.IngredientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Ingredient}.
 */
@Service
@Transactional
public class IngredientServiceImpl implements IngredientService {

    private final Logger log = LoggerFactory.getLogger(IngredientServiceImpl.class);

    private final IngredientRepository ingredientRepository;

    public IngredientServiceImpl(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public Ingredient save(Ingredient ingredient) {
        log.debug("Request to save Ingredient : {}", ingredient);
        return ingredientRepository.save(ingredient);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Ingredient> findAll() {
        log.debug("Request to get all Ingredients");
        return ingredientRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Ingredient> findOne(Long id) {
        log.debug("Request to get Ingredient : {}", id);
        return ingredientRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ingredient : {}", id);
        ingredientRepository.deleteById(id);
    }
}
