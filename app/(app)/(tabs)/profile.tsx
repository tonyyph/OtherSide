import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import LottieView from "lottie-react-native";
import { getListAuctionsMe, getMe } from "@/api";
import { LogOut } from "lucide-react-native";
import { useLogout } from "@/hooks/auth/useLogout";
import { useFocusEffect } from "@react-navigation/native";

interface Auction {
  id: number;
  product: {
    name: string;
    brand: string;
    category: string;
    image: { fileUrl: string };
  };
  endDate: number;
  status: "active" | "ended";
  lastBid?: { userID: number; amount: number };
  endedAt?: number | null;
}

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { onLogout } = useLogout();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getListAuctionsMe();
      const { data: session } = await getMe();
      setUserProfile(session);
      setAuctions(data?.data || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Auction History</Text>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={onLogout}>
            <LogOut color="#333" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={auctions}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="bg-[#F0F0F0]"
        renderItem={({ item }) => {
          const isWinner =
            item.status === "ended" && item.lastBid?.userID === userProfile?.id;

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: item.product.image.fileUrl }}
                style={styles.image}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.category}>
                  {item.product.category} · {item.product.brand}
                </Text>
                <Text style={styles.myBid}>
                  Last bid:{" "}
                  <Text style={styles.amount}>${item.lastBid?.amount}</Text>
                </Text>
                <Text style={styles.time}>
                  End: {new Date(item.endDate * 1000).toLocaleString()}
                </Text>

                {isWinner ? (
                  <Text style={styles.winner}>🏆 You won this auction!</Text>
                ) : item.status === "ended" ? (
                  <Text style={styles.lost}>You did not win</Text>
                ) : (
                  <Text style={styles.active}>Auction still active</Text>
                )}
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => <View style={{ height: 80 }} />}
        ListEmptyComponent={
          <LottieView
            style={{ width: 120, height: 120, alignSelf: "center" }}
            source={require("@/assets/json/empty_category.json")}
            autoPlay
            loop
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: {
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#222" },
  headerSubtitle: { fontSize: 14, color: "#555", marginTop: 4 },
  card: {
    flexDirection: "row",
    padding: 14,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#eee" },
  productName: { fontSize: 16, fontWeight: "700", color: "#111" },
  category: { fontSize: 13, color: "#777", marginTop: 2 },
  myBid: { fontSize: 13, color: "#333", marginTop: 6 },
  amount: { fontWeight: "700", color: "#e11d48" },
  time: { fontSize: 12, color: "#666", marginTop: 2 },
  winner: { fontSize: 13, fontWeight: "700", color: "#16a34a", marginTop: 4 },
  lost: { fontSize: 13, fontWeight: "600", color: "#dc2626", marginTop: 4 },
  active: { fontSize: 13, fontWeight: "600", color: "#3b82f6", marginTop: 4 }
});
