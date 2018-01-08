import MatchmakeTicketResponse from './responses/MatchmakeTicketResponse';

export default function MatchmakeAddRequest(requiredCount) {
  let filters = [];
  let properties = [];

  const self = {
    get requiredCount() {
      return requiredCount;
    },
    set requiredCount(val) {
      requiredCount = val;
    },

    get filters() {
      return filters;
    },
    set filters(val) {
      filters = val;
    },

    get properties() {
      return properties;
    },
    set properties(val) {
      properties = val;
    },

    addTermFilter,
    addRangeFilter,
    addCheckFilter,
    addStringSetProperty,
    addIntegerProperty,
    addBooleanProperty,
    build_,
    processResponse_: MatchmakeTicketResponse,
  };

  return self;

  function addTermFilter(name, termSet, matchAllTerms) {
    filters.push({
      name,
      term: {
        terms: termSet,
        matchAllTerms,
      },
    });

    return self;
  }

  function addRangeFilter(name, lowerbound, upperbound) {
    filters.push({
      name,
      range: {
        lowerBound,
        upperBound,
      },
    });

    return self;
  }

  function addCheckFilter(name, value) {
    filters.push({
      name,
      check: value,
    });

    return self;
  }

  function addStringSetProperty(key, termSet) {
    properties.push({
      key,
      stringSet: termSet,
    });

    return self;
  }

  function addIntegerProperty(key, integerValue) {
    properties.push({
      key,
      intValue: integerValue,
    });
    return self;
  }

  function addBooleanProperty(key, boolValue) {
    properties.push({
      key,
      boolValue,
    });
    return self;
  }

  function build_() {
    return {
      matchmakeAdd: {
        requiredCount,
        filters,
        properties,
      },
    };
  }
}
