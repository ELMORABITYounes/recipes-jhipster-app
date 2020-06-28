import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAuthor } from 'app/shared/model/author.model';
import { getEntities as getAuthors } from 'app/entities/author/author.reducer';
import { getEntity, updateEntity, createEntity, reset } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecipeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecipeUpdate = (props: IRecipeUpdateProps) => {
  const [authorId, setAuthorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recipeEntity, authors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/recipe' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAuthors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...recipeEntity,
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
          <h2 id="recipesApp.recipe.home.createOrEditLabel">Create or edit a Recipe</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recipeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="recipe-id">ID</Label>
                  <AvInput id="recipe-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="recipe-title">
                  Title
                </Label>
                <AvField id="recipe-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="imageLabel" for="recipe-image">
                  Image
                </Label>
                <AvField id="recipe-image" type="text" name="image" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="recipe-description">
                  Description
                </Label>
                <AvField id="recipe-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="recipe-author">Author</Label>
                <AvInput id="recipe-author" type="select" className="form-control" name="author.id">
                  <option value="" key="0" />
                  {authors
                    ? authors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/recipe" replace color="info">
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
  authors: storeState.author.entities,
  recipeEntity: storeState.recipe.entity,
  loading: storeState.recipe.loading,
  updating: storeState.recipe.updating,
  updateSuccess: storeState.recipe.updateSuccess,
});

const mapDispatchToProps = {
  getAuthors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeUpdate);
