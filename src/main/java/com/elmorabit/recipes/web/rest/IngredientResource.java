package com.elmorabit.recipes.web.rest;

import com.elmorabit.recipes.domain.Ingredient;
import com.elmorabit.recipes.service.IngredientService;
import com.elmorabit.recipes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.elmorabit.recipes.domain.Ingredient}.
 */
@RestController
@RequestMapping("/api")
public class IngredientResource {

    private final Logger log = LoggerFactory.getLogger(IngredientResource.class);

    private static final String ENTITY_NAME = "ingredient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IngredientService ingredientService;

    public IngredientResource(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    /**
     * {@code POST  /ingredients} : Create a new ingredient.
     *
     * @param ingredient the ingredient to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingredient, or with status {@code 400 (Bad Request)} if the ingredient has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ingredients")
    public ResponseEntity<Ingredient> createIngredient(@RequestBody Ingredient ingredient) throws URISyntaxException {
        log.debug("REST request to save Ingredient : {}", ingredient);
        if (ingredient.getId() != null) {
            throw new BadRequestAlertException("A new ingredient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ingredient result = ingredientService.save(ingredient);
        return ResponseEntity.created(new URI("/api/ingredients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ingredients} : Updates an existing ingredient.
     *
     * @param ingredient the ingredient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingredient,
     * or with status {@code 400 (Bad Request)} if the ingredient is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingredient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ingredients")
    public ResponseEntity<Ingredient> updateIngredient(@RequestBody Ingredient ingredient) throws URISyntaxException {
        log.debug("REST request to update Ingredient : {}", ingredient);
        if (ingredient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ingredient result = ingredientService.save(ingredient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingredient.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ingredients} : get all the ingredients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ingredients in body.
     */
    @GetMapping("/ingredients")
    public List<Ingredient> getAllIngredients() {
        log.debug("REST request to get all Ingredients");
        return ingredientService.findAll();
    }

    /**
     * {@code GET  /ingredients/:id} : get the "id" ingredient.
     *
     * @param id the id of the ingredient to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingredient, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> getIngredient(@PathVariable Long id) {
        log.debug("REST request to get Ingredient : {}", id);
        Optional<Ingredient> ingredient = ingredientService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ingredient);
    }

    /**
     * {@code DELETE  /ingredients/:id} : delete the "id" ingredient.
     *
     * @param id the id of the ingredient to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        log.debug("REST request to delete Ingredient : {}", id);
        ingredientService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
