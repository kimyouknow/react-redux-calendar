import {
  ADD_SCHEDULE,
  CHANGE_DATE,
  COM_SCHEDULE,
  DEL_SCHEDULE,
  EDIT_SCHEDULE,
  LOAD_SCHEDULE,
  NEXT_MONTH,
  PREV_MONTH,
  SET_MODAL,
  SET_TODAY,
} from "_actions/types";

const initState = {
  activeD: new Date().getDate(),
  activeM: new Date().getMonth(),
  activeY: new Date().getFullYear(),
  activeS: [],
  addModal: false,
  editModal: false,
};

const calendarReducer = (state = initState, action) => {
  const found = (id) =>
    state.activeS.find((element) => String(element.id) === String(id));
  const filtered = (id) =>
    state.activeS.filter((element) => String(element.id) !== String(id));
  switch (action.type) {
    case CHANGE_DATE: {
      const newDate = new Date(action.date);
      return { ...state, activeD: newDate.getDate() };
    }
    case SET_TODAY: {
      const newDate = action.date;
      return {
        ...state,
        activeD: newDate.getDate(),
        activeM: newDate.getMonth(),
        activeY: newDate.getFullYear(),
      };
    }
    case PREV_MONTH: {
      let newM = state.activeM - 1;
      let newY = state.activeY;
      let newD = new Date(newY, newM, 1).getDate();
      if (state.activeM === 1) {
        newM = state.activeM + 11;
        newY = state.activeY - 1;
        newD = new Date(newY, newM, 1).getDate();
        return { ...state, activeD: newD, activeM: newM, activeY: newY };
      }
      return { ...state, activeD: newD, activeM: newM };
    }
    case NEXT_MONTH: {
      let newM = state.activeM + 1;
      let newY = state.activeY;
      let newD = new Date(newY, newM, 1).getDate();
      if (state.activeM === 11) {
        newM = state.activeM - 11;
        newY = state.activeY + 1;
        newD = new Date(newY, newM, 1).getDate();
        return { ...state, activeD: newD, activeM: newM, activeY: newY };
      }
      return { ...state, activeD: newD, activeM: newM };
    }
    case LOAD_SCHEDULE: {
      return { ...state, activeS: action.data };
    }
    case ADD_SCHEDULE: {
      return { ...state, activeS: [...state.activeS, action.data] };
    }
    case DEL_SCHEDULE: {
      return { ...state, activeS: filtered(action.id) };
    }
    case COM_SCHEDULE: {
      return {
        ...state,
        activeS: [
          ...filtered(action.id),
          { ...found(action.id), completed: action.completed },
        ],
      };
    }
    case EDIT_SCHEDULE: {
      const { id, title, desc } = action;
      return {
        ...state,
        activeS: [...filtered(id), { ...found(id), title, desc }],
      };
    }
    case SET_MODAL: {
      if (action.text === "edit") {
        return { ...state, editModal: !state.editModal };
      } else {
        return { ...state, addModal: !state.addModal };
      }
    }
    default:
      return state;
  }
};

export default calendarReducer;
