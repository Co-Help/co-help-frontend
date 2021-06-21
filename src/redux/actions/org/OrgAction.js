import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  ADD_VACCINE,
  DEL_ALL_VACCINES,
  DEL_VACCINE_FROM_BATCH,
  FILTER_VACCINE_BATCH,
  GET_ALL_VACCINES,
  GET_VACCINE_BY_BATCH,
  GET_VACCINE_BY_BATCH_FAIL,
} from './types';

export const addVaccine = data => async dispatch => {
  try {
    await axios.post(
      '/org/vaccination',
      {
        ...data,
        vaccine_date: new Date(data.vaccine_date).getTime().toString(),
        cost: +data.cost,
        quantity: +data.quantity,
        min_age: +data.min_age,
        max_age: +data.max_age,
      },
      AUTH_HEADER
    );
    dispatch({type: ADD_VACCINE, payload: true});
  } catch (err) {
    dispatch({type: ADD_VACCINE, payload: false});
    console.error(err);
  }
};

export const getVaccines = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/vaccination', AUTH_HEADER);
    dispatch({type: GET_ALL_VACCINES, payload: data?.services});
  } catch (err) {
    console.error(err);
  }
};

export const deleteVaccines = () => async dispatch => {
  try {
    await axios.delete('/org/vaccination', AUTH_HEADER);
    dispatch({type: DEL_ALL_VACCINES});
  } catch (err) {
    console.error(err);
  }
};

export const getVaccineBatch = batch_code => async dispatch => {
  try {
    const {data} = await axios.get(
      `/org/vaccination/by_batch_code?batch_code=${batch_code}`,
      AUTH_HEADER
    );
    dispatch({type: GET_VACCINE_BY_BATCH, payload: data.services});
  } catch (err) {
    dispatch({type: GET_VACCINE_BY_BATCH_FAIL, payload: err.message});
    console.error(err);
  }
};

export const FilterValues = {
  all: 'all',
  booked: 'booked',
  nonBooked: 'non-booked',
};

export const vaccineBatchFilter = filter => async (dispatch, getState) => {
  const vaccineBatch = getState()?.orgVaccine?.vaccineBatch;

  switch (filter) {
    case FilterValues.booked: {
      dispatch({
        type: FILTER_VACCINE_BATCH,
        payload: vaccineBatch.filter(v => v.booked),
      });
      break;
    }
    case FilterValues.nonBooked: {
      dispatch({
        type: FILTER_VACCINE_BATCH,
        payload: vaccineBatch.filter(v => !v.booked),
      });
      break;
    }
    default: {
      dispatch({
        type: FILTER_VACCINE_BATCH,
        payload: [],
      });
      break;
    }
  }
};

export const deleteVaccineFromBatch = id => async dispatch => {
  try {
    await axios.delete('/org/vaccination', {...AUTH_HEADER, data: {id}});
    dispatch({type: DEL_VACCINE_FROM_BATCH, payload: id});
    dispatch(vaccineBatchFilter(FilterValues.nonBooked));
  } catch (err) {
    console.error(err);
  }
};
