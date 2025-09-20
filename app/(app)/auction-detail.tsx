import { useAuction } from "@/hooks/useAuction";
import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import LottieView from "lottie-react-native";

export default function AuctionDetailScreen() {
  const { auctionId } = useLocalSearchParams();
  const { getAuctionsDetails, loading, auction, listBid } = useAuctionDetail();
  const { handleOnBid } = useAuction({});

  const [modalVisible, setModalVisible] = useState(false);
  const [bidValue, setBidValue] = useState("");

  useEffect(() => {
    if (auctionId) {
      getAuctionsDetails(auctionId as string);
    }
  }, [getAuctionsDetails, auctionId]);

  const bids = useMemo(() => {
    if (!listBid) return [];
    return [...listBid].sort((a, b) => b.bidAt - a.bidAt);
  }, [listBid]);

  if (loading || !auction) {
    return (
      <SafeAreaView style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  const isEnded = auction.status !== "active";
  const winner = isEnded ? auction.lastBid?.user?.name : null;

  const formatTime = (ts: number) => {
    const d = new Date(ts * 1000);
    return d.toLocaleString();
  };

  const handleConfirmBid = async () => {
    if (!bidValue) return;
    await handleOnBid(auction.id, Number(bidValue));
    await getAuctionsDetails(auctionId as string);
    setModalVisible(false);
    setBidValue("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={router.back}>
          <ArrowLeftIcon color="#333" size={22} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View>
                <Image
                  source={{ uri: auction.product.image.fileUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.body}>
                  <Text style={styles.title}>{auction.product.name}</Text>
                  <Text style={styles.category}>
                    {auction.product.category} · {auction.product.brand}
                  </Text>
                  <Text style={styles.description}>
                    {auction.product.description}
                  </Text>

                  <View style={styles.priceBox}>
                    <Text style={styles.label}>Start Price:</Text>
                    <Text style={styles.value}>${auction.minPrice}</Text>
                  </View>
                  {auction.lastBid && (
                    <View style={styles.priceBox}>
                      <Text style={styles.label}>Last Bid:</Text>
                      <Text style={styles.value}>
                        ${auction.lastBid.amount}
                      </Text>
                    </View>
                  )}

                  <View style={styles.timeBox}>
                    <Text style={styles.label}>
                      Start: {formatTime(auction.startDate)}
                    </Text>
                    <Text style={styles.label}>
                      End: {formatTime(auction.endDate)}
                    </Text>
                  </View>

                  {isEnded && winner && (
                    <View style={styles.winnerBox}>
                      <Text style={styles.winnerText}>
                        {"🏆 "} Winner:{" "}
                        <Text style={styles.winnerName}>{winner}</Text>
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            }
            data={bids}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isLastBid = item.id === auction.lastBid?.id;
              return (
                <View
                  key={item.id}
                  style={[styles.bidRow, isLastBid && styles.lastBidRow]}
                >
                  <Text
                    style={[styles.bidUser, isLastBid && styles.lastBidText]}
                  >
                    {item?.user?.name}
                  </Text>
                  <Text
                    style={[styles.bidAmount, isLastBid && styles.lastBidText]}
                  >
                    ${item?.amount}
                  </Text>
                  <Text
                    style={[styles.bidTime, isLastBid && styles.lastBidText]}
                  >
                    {formatTime(item?.bidAt)}
                  </Text>
                </View>
              );
            }}
            ListEmptyComponent={
              <LottieView
                style={{ width: 120, height: 120, alignSelf: "center" }}
                source={require("@/assets/json/empty_category.json")}
                autoPlay
                loop
              />
            }
            ListFooterComponent={() =>
              !isEnded ? (
                <TouchableOpacity
                  style={styles.bidButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.bidButtonText}>Place a Bid</Text>
                </TouchableOpacity>
              ) : null
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Bid Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Place your bid for{" "}
                <Text style={{ color: "#3b82f6" }}>{auction.product.name}</Text>
              </Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Enter bid amount"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={bidValue}
                onChangeText={setBidValue}
                autoFocus
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ddd" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.modalButtonText, { color: "#333" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#3b82f6" }]}
                  onPress={handleConfirmBid}
                >
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  image: { width: "100%", height: 260, backgroundColor: "#f5f5f5" },
  body: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", color: "#222" },
  category: { fontSize: 14, color: "#777", marginTop: 4 },
  description: { fontSize: 14, color: "#555", marginTop: 10, lineHeight: 20 },
  priceBox: { flexDirection: "row", marginTop: 10 },
  label: { fontSize: 14, color: "#555", marginRight: 6 },
  value: { fontSize: 15, fontWeight: "700", color: "#e11d48" },
  timeBox: { marginTop: 14 },
  winnerBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0fdf4"
  },
  winnerText: { fontSize: 15, color: "#222" },
  winnerName: { fontWeight: "700", color: "#16a34a" },
  bidRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  bidUser: { fontSize: 14, color: "#333", flex: 1 },
  bidAmount: { fontSize: 14, fontWeight: "600", color: "#e11d48", width: 80 },
  bidTime: { fontSize: 12, color: "#777", textAlign: "right", flex: 1 },
  lastBidRow: {
    backgroundColor: "#eff6ff",
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6"
  },
  lastBidText: {
    color: "#1e3a8a",
    fontWeight: "700"
  },
  bidButton: {
    margin: 16,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  bidButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%"
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12
  },
  modalInput: {
    backgroundColor: "#f5f5f5",
    color: "#222",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10
  },
  modalButtonText: { color: "#fff", fontWeight: "600" },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 14
  }
});
