class QueryKeyFactory {
  currentUser() {
    return ["users", "me"];
  }
}

export const queryKeys = new QueryKeyFactory();
