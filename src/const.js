const TRIP_COUNT = 3;
const TYPES_TRANSPORT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FilterType = {
  FUTURE: 'Future',
  EVERYTHING: 'Everything',
  PAST: 'Past'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  TRIP_COUNT,
  TYPES_TRANSPORT,
  FilterType,
  SortType,
  UserAction,
  UpdateType
};
