class QueryKeyFactory {
  currentUser() {
    return ["users", "me"];
  }

  userTasks(userId: number | null) {
    return ["tasks", userId];
  }
}

export const queryKeys = new QueryKeyFactory();
