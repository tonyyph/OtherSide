import { useAuction } from "@/hooks/useAuction";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

function AuctionCard({ item, onOpenBid }: any) {
  const lastBidAmount = item.lastBid ? item.lastBid.amount : null;
  const isEnded = item.status !== "active";

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        router.push({
          pathname: "/auction-detail",
          params: { auctionId: item?.id }
        });
      }}
      style={styles.card}
    >
      {/* Image */}
      <Image
        source={{ uri: item.product.image.fileUrl }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.product.name}
        </Text>

        <Text style={styles.cardInfo}>
          {lastBidAmount
            ? `Last Bid: ${lastBidAmount} USD`
            : `Start: ${item.minPrice} USD`}
        </Text>

        <Text style={styles.price}>${item.minPrice}</Text>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.bidButton,
            { backgroundColor: isEnded ? "#ccc" : "#3b82f6" }
          ]}
          disabled={isEnded}
          onPress={() => onOpenBid(item)}
        >
          <Text style={styles.bidButtonText}>
            {isEnded ? "View Winner" : "Place Bid"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { auctions, handleOnBid, loading, fetchAuctions } = useAuction({});
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Price");
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAuctions(1);
    }, [])
  );

  // // auto refresh every 30s
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchAuctions(1);
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, [fetchAuctions]);

  // modal bid
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [bidValue, setBidValue] = useState("");

  const filteredAuctions = auctions
    .filter((item: any) =>
      item.product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) => {
      return b?.lastBid?.createdAt - a?.lastBid?.createdAt;
    });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleOpenBid = (auction: any) => {
    setSelectedAuction(auction);
    setModalVisible(true);
  };

  const handleConfirmBid = () => {
    if (!bidValue) return;
    handleOnBid(selectedAuction.id, Number(bidValue));
    setModalVisible(false);
    setBidValue("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFFFFF"} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>AubidNow</Text>
              <Text style={styles.headerSubtitle}>Find your best deals</Text>
            </View>

            {/* Search + Filter */}
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  placeholder="Search auctions..."
                  placeholderTextColor="#999"
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabRow}>
              {["Price", "Model", "More Filters"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={styles.tabItem}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.tabTextActive
                    ]}
                  >
                    {tab}
                  </Text>
                  {activeTab === tab && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Auction grid */}
            <FlatList
              data={filteredAuctions}
              renderItem={({ item }) => (
                <AuctionCard item={item} onOpenBid={handleOpenBid} />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ height: 60 }} />}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />

            {/* Modal for bid */}
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
                      <Text style={{ color: "#3b82f6" }}>
                        {selectedAuction?.product?.name}
                      </Text>
                    </Text>

                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter bid amount"
                      placeholderTextColor="#aaa"
                      keyboardType="numeric"
                      value={bidValue}
                      onChangeText={setBidValue}
                      autoFocus
                    />

                    <View style={styles.modalActions}>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          { backgroundColor: "#eee" }
                        ]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text
                          style={[styles.modalButtonText, { color: "#333" }]}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.modalButton,
                          { backgroundColor: "#3b82f6" }
                        ]}
                        onPress={handleConfirmBid}
                      >
                        <Text style={styles.modalButtonText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {/* Loading overlay */}
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#3b82f6" />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  header: { paddingTop: 20, alignItems: "center", backgroundColor: "#FFFFFF" },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#222" },
  headerSubtitle: { fontSize: 13, color: "#666", marginTop: 4 },
  searchRow: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 42,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  searchIcon: { fontSize: 16, marginRight: 6, color: "#999" },
  searchInput: { flex: 1, fontSize: 14, color: "#000" },
  filterButton: {
    width: 42,
    height: 42,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center"
  },
  filterIcon: { fontSize: 18, color: "#555" },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff"
  },
  tabItem: { alignItems: "center", paddingVertical: 10 },
  tabText: { fontSize: 14, color: "#666" },
  tabTextActive: { color: "#e63946", fontWeight: "600" },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    width: "100%",
    backgroundColor: "#e63946",
    borderRadius: 2
  },
  listContent: { padding: 16 },
  card: {
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    flex: 0.48,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  cardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#fafafa"
  },
  cardBody: { padding: 10 },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
    color: "#222"
  },
  cardInfo: { fontSize: 12, color: "#666" },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e63946",
    marginTop: 4
  },
  bidButton: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  bidButtonText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
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
    backgroundColor: "#f2f2f2",
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 16
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end" },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10
  },
  modalButtonText: { color: "#fff", fontWeight: "600" },

  // loading
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center"
  }
});
