import React, {  useRef, useCallback, useMemo } from "react";
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, Text } from "react-native";
import { Typing, FooterRoundedVertical, RefreshButton, PostVerticalLarge, PostGroup } from "./components";
import { PostModel } from "../../models";
import { COLORS } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import useProximityChat from "../../hooks/useProximityChat";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Chat = ({ onLoad }) => {
  const {
    activePosition,
    activeDateCreated,
    allPosts,
    send,
    keyExtractor,
    refresh,
    refreshing,
    loadMore,
    loadingMore,
    reachedEnd,
  } = useProximityChat({ onLoad });

  const list = useRef();
  const footer = useRef();

  const headerHeight = useHeaderHeight();

  const renderItem = useCallback(({ item }) => {
    const model = new PostModel({ post: Array.isArray(item) ? item[0] : item });
    const animated = model.dateCreated > activeDateCreated;

    if (Array.isArray(item)) {
      return (
        <PostGroup
          posts={item}
          animated={animated}
        />
      );
    }

    return (
      <PostVerticalLarge
        post={model.post}
        animated={animated}
      />
    );
  }, [activeDateCreated]);

  const onRefresh = () => {
    refresh();
  };

  const onEndReached = () => {
    loadMore();
  }

  const onPressRefreshButton = () => {
    onRefresh();
    list.current.scrollToOffset({ offset: 0, animated: true });
  };

  const onPressSend = (text, photo, flipHorizontally) => {
    send(text, photo, flipHorizontally);
    list.current.scrollToOffset({ offset: 0, animated: true });
  };

  const insets = useSafeAreaInsets();

  const chat = useMemo(() => {
    return <FlatList
      ref={list}
      inverted
      contentContainerStyle={{ paddingTop: 0, paddingBottom: headerHeight - insets.top}}
      data={allPosts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={loadingMore ? (
        <ActivityIndicator style={{ padding: 16 }} />
      ) : (reachedEnd ? (
        <Text style={{ textAlign: "center", margin: 16, color: COLORS.DARK }}>
          You've reached the end of time
        </Text>
      ) : null
      )}
    />
  }, [list, headerHeight, insets.top, allPosts, keyExtractor, renderItem, refreshing, onRefresh, loadingMore, reachedEnd]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ios: "padding" })}
      keyboardVerticalOffset={insets.bottom - 20}
    >
      { chat }
      <RefreshButton
        activePosition={activePosition}
        onRefresh={onPressRefreshButton}
      />
      <Typing />
      <FooterRoundedVertical
        ref={footer}
        onPressSend={onPressSend}
      />
    </KeyboardAvoidingView>
  );
};

export default Chat;