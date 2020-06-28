import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ingredient.reducer';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIngredientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IngredientDetail = (props: IIngredientDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ingredientEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Ingredient [<b>{ingredientEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{ingredientEntity.quantity}</dd>
          <dt>
            <span id="unit">Unit</span>
          </dt>
          <dd>{ingredientEntity.unit}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{ingredientEntity.name}</dd>
          <dt>Recipe</dt>
          <dd>{ingredientEntity.recipe ? ingredientEntity.recipe.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ingredient" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ingredient/${ingredientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ingredient }: IRootState) => ({
  ingredientEntity: ingredient.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IngredientDetail);
