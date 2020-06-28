import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities as getRecipes } from 'app/entities/recipe/recipe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ingredient.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIngredientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IngredientUpdate = (props: IIngredientUpdateProps) => {
  const [recipeId, setRecipeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ingredientEntity, recipes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ingredient');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRecipes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ingredientEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="recipesApp.ingredient.home.createOrEditLabel">Create or edit a Ingredient</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ingredientEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ingredient-id">ID</Label>
                  <AvInput id="ingredient-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantityLabel" for="ingredient-quantity">
                  Quantity
                </Label>
                <AvField id="ingredient-quantity" type="string" className="form-control" name="quantity" />
              </AvGroup>
              <AvGroup>
                <Label id="unitLabel" for="ingredient-unit">
                  Unit
                </Label>
                <AvField id="ingredient-unit" type="text" name="unit" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="ingredient-name">
                  Name
                </Label>
                <AvField id="ingredient-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="ingredient-recipe">Recipe</Label>
                <AvInput id="ingredient-recipe" type="select" className="form-control" name="recipe.id">
                  <option value="" key="0" />
                  {recipes
                    ? recipes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ingredient" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  recipes: storeState.recipe.entities,
  ingredientEntity: storeState.ingredient.entity,
  loading: storeState.ingredient.loading,
  updating: storeState.ingredient.updating,
  updateSuccess: storeState.ingredient.updateSuccess,
});

const mapDispatchToProps = {
  getRecipes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IngredientUpdate);
