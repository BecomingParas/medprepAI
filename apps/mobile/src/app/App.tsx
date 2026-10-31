import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api';
import type { Todo } from './api';

export const App = () => {
  const { width, height } = useWindowDimensions();
  const isWideLayout = width >= 720;
  const isCompactLayout = width < 360;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyIds, setBusyIds] = useState<Set<string>>(() => new Set());
  const [error, setError] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      setError('');
      setTodos(await getTodos());
      setLoadFailed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load todos.');
      setLoadFailed(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadTodos();
  }, [loadTodos]);

  async function handleCreateTodo() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || saving) return;

    try {
      setSaving(true);
      setError('');
      const todo = await createTodo(trimmedTitle);
      setTodos((current) => [todo, ...current]);
      setTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create todo.');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleTodo(todo: Todo) {
    setBusyIds((current) => new Set(current).add(todo.id));
    try {
      setError('');
      const updatedTodo = await updateTodo(todo.id, !todo.completed);
      setTodos((current) =>
        current.map((item) => (item.id === todo.id ? updatedTodo : item))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update todo.');
    } finally {
      setBusyIds((current) => {
        const next = new Set(current);
        next.delete(todo.id);
        return next;
      });
    }
  }

  async function handleDeleteTodo(id: string) {
    setBusyIds((current) => new Set(current).add(id));
    try {
      setError('');
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete todo.');
    } finally {
      setBusyIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: isCompactLayout ? 16 : isWideLayout ? 32 : 22,
            paddingTop: height < 520 ? 20 : isWideLayout ? 56 : 40,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              void loadTodos();
            }}
            tintColor={colors.accent}
          />
        }
      >
        <View
          style={[
            styles.panel,
            isWideLayout && styles.widePanel,
            { maxWidth: isWideLayout ? 680 : 520 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>A LITTLE MORE FOCUS</Text>
            <Text
              style={[
                styles.heading,
                { fontSize: isWideLayout ? 42 : isCompactLayout ? 30 : 34 },
              ]}
            >
              Today&apos;s todos
            </Text>
            <Text style={styles.subtitle}>
              Keep the next step clear. You&apos;ve got this.
            </Text>
          </View>

          <View style={styles.composer}>
            <TextInput
              accessibilityLabel="New todo"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              maxLength={200}
              placeholder="What needs doing?"
              placeholderTextColor={colors.muted}
              returnKeyType="done"
              onSubmitEditing={() => void handleCreateTodo()}
              editable={!saving}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => void handleCreateTodo()}
              disabled={saving || !title.trim()}
              style={({ pressed }) => [
                styles.addButton,
                (!title.trim() || saving) && styles.disabledButton,
                pressed && styles.pressed,
              ]}
            >
              {saving ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.addButtonText}>Add</Text>
              )}
            </Pressable>
          </View>

          {error && (!loadFailed || todos.length > 0) ? (
            <View style={styles.errorBox} accessibilityRole="alert">
              <Text style={styles.errorText}>{error}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => void loadTodos()}
                hitSlop={8}
              >
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.listHeading}>
            <Text style={styles.listTitle}>Your list</Text>
            <Text style={styles.count}>
              {completedCount} of {todos.length} done
            </Text>
          </View>

          {loading ? (
            <View style={styles.message}>
              <ActivityIndicator color={colors.accent} />
              <Text style={styles.messageText}>Loading your todos...</Text>
            </View>
          ) : loadFailed && todos.length === 0 ? (
            <View style={styles.message}>
              <Text style={styles.emptyTitle}>Can&apos;t reach your list</Text>
              <Text style={styles.messageText}>{error}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => void loadTodos()}
                style={styles.retryButton}
              >
                <Text style={styles.retryButtonText}>Try again</Text>
              </Pressable>
            </View>
          ) : todos.length === 0 ? (
            <View style={styles.message}>
              <Text style={styles.emptyTitle}>A fresh start</Text>
              <Text style={styles.messageText}>
                Nothing on your list yet. Add your first todo above.
              </Text>
            </View>
          ) : (
            <View style={styles.todoList}>
              {todos.map((todo) => {
                const busy = busyIds.has(todo.id);

                return (
                  <View key={todo.id} style={styles.todoRow}>
                    <Pressable
                      accessibilityRole="checkbox"
                      accessibilityState={{
                        checked: todo.completed,
                        disabled: busy,
                      }}
                      accessibilityLabel={`Mark ${todo.title} ${
                        todo.completed ? 'incomplete' : 'complete'
                      }`}
                      disabled={busy}
                      onPress={() => void handleToggleTodo(todo)}
                      style={styles.todoMain}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          todo.completed && styles.checkboxChecked,
                        ]}
                      >
                        {todo.completed ? (
                          <Text style={styles.checkmark}>✓</Text>
                        ) : null}
                      </View>
                      <Text
                        style={[
                          styles.todoText,
                          todo.completed && styles.todoTextCompleted,
                        ]}
                      >
                        {todo.title}
                      </Text>
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Delete ${todo.title}`}
                      disabled={busy}
                      onPress={() => void handleDeleteTodo(todo.id)}
                      hitSlop={10}
                      style={({ pressed }) => [
                        styles.deleteButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      {busy ? (
                        <ActivityIndicator color={colors.muted} size="small" />
                      ) : (
                        <Text style={styles.deleteText}>Delete</Text>
                      )}
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const colors = {
  background: '#f7f8f5',
  ink: '#172522',
  muted: '#7a8882',
  accent: '#287c68',
  accentDark: '#1f6253',
  line: '#e5e9e4',
  white: '#ffffff',
  danger: '#a44343',
  dangerBackground: '#fff0ee',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 36,
  },
  panel: {
    width: '100%',
  },
  widePanel: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 24,
    borderWidth: 1,
    padding: 32,
  },
  header: {
    marginBottom: 28,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.7,
    marginBottom: 10,
  },
  heading: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  composer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 24,
    padding: 7,
  },
  input: {
    color: colors.ink,
    flex: 1,
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 11,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 64,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.48,
  },
  pressed: {
    opacity: 0.7,
  },
  errorBox: {
    alignItems: 'center',
    backgroundColor: colors.dangerBackground,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: colors.danger,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 12,
  },
  retryText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  listHeading: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '700',
  },
  count: {
    color: colors.muted,
    fontSize: 13,
  },
  message: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 150,
    padding: 24,
  },
  messageText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '600',
  },
  retryButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 10,
    marginTop: 16,
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  todoList: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  todoRow: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  todoMain: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minHeight: 44,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#c6d0ca',
    borderRadius: 7,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    marginRight: 12,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
  },
  todoText: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  todoTextCompleted: {
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    minHeight: 40,
    minWidth: 52,
  },
  deleteText: {
    color: colors.muted,
    fontSize: 13,
  },
});

export default App;
