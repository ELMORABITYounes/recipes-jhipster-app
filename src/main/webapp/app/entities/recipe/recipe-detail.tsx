import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecipeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecipeDetail = (props: IRecipeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recipeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Recipe [<b>{recipeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{recipeEntity.title}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>{recipeEntity.image}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{recipeEntity.description}</dd>
          <dt>Author</dt>
          <dd>{recipeEntity.author ? recipeEntity.author.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/recipe" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recipe/${recipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recipe }: IRootState) => ({
  recipeEntity: recipe.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
