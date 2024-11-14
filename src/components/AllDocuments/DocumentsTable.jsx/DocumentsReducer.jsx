const dateParser = (dateString) => {
  const date = new Date(dateString);

  const pad = (number) => (number < 10 ? "0" + number : number);

  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const day = pad(date.getDate());
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  const formattedDate = `${month}.${day}.${year} ${hours}:${minutes}`;
  return formattedDate;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "page": {
      return {
        ...state,
        paginationModel: { ...state.paginationModel, page: action.page },
      };
    }
    case "pageSize": {
      return {
        ...state,
        paginationModel: {
          ...state.paginationModel,
          pageSize: action.pageSize,
        },
      };
    }
    case "forWho": {
      return {
        ...state,
        chipsState: { ...state.chipsState, forWho: action.forWho },
      };
    }
    case "whatType": {
      return {
        ...state,
        chipsState: { ...state.chipsState, whatType: action.whatType },
      };
    }
    case "date": {
      const newValue =
        action.date === undefined ? null : dateParser(action.date.$d);
      return {
        ...state,
        filtering: { ...state.filtering, date: newValue },
      };
    }
    case "category": {
      const name =
        action.value === "" || action.value === undefined ? null : action.value;
      return {
        ...state,
        filtering: { ...state.filtering, category: name },
      };
    }
    case "status": {
      const name =
        action.value === "" || action.value === undefined ? null : action.value;
      return {
        ...state,
        filtering: { ...state.filtering, status: name },
      };
    }
    case "isSigned": {
      return {
        ...state,
        filtering: { ...state.filtering, isSigned: action.isSigned },
      };
    }
    case "name": {
      const newName = action.value === "" ? null : action.value;
      return {
        ...state,
        searching: { ...state.searching, name: newName },
      };
    }
    case "author": {
      const newName = action.value === "" ? null : action.value;
      return {
        ...state,
        searching: { ...state.searching, author: newName },
      };
    }
    case "sorting": {
      return { ...state, sorting: action.sorting };
    }
    case "signed": {
      return { ...state, signed: action.id };
    }
  }
};
