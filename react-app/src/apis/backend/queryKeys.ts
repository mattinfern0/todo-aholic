class QueryKeyFactory {
  currentUser() {
    return ["users", "me"];
  }

  userTasks(userId: number | null) {
    return ["tasks", userId];
  }

  userTaskLists(userId: number | null) {
    return ["tasks-lists", userId];
  }
}

export const queryKeys = new QueryKeyFactory();
