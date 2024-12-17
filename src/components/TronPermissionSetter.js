import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Plus, Trash2, Shield } from 'lucide-react';

const TronPermissionSetter = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [targetAddress, setTargetAddress] = useState("");
  const [controllers, setControllers] = useState([""]);
  const [threshold, setThreshold] = useState(1);

  // Original TronWeb initialization and functionality remains the same
  useEffect(() => {
    const initTronWeb = async () => {
      let tries = 0;
      const maxTries = 10;
      
      const checkTronWeb = () => {
        if (window.tronWeb && 
            window.tronWeb.ready && 
            window.tronWeb.defaultAddress && 
            window.tronWeb.defaultAddress.base58) {
          setupTronWeb();
        } else if (tries < maxTries) {
          tries++;
          setTimeout(checkTronWeb, 1000);
        } else {
          setError("未检测到TronLink或账户未解锁，请确保在TronLink中打开并解锁钱包");
        }
      };

      checkTronWeb();
    };

    const setupTronWeb = async () => {
      try {
        const tronWeb = window.tronWeb;
        console.log("当前节点:", tronWeb.fullNode.host);
        setTronWeb(tronWeb);
        
        try {
          const nodeInfo = await tronWeb.trx.getNodeInfo();
          console.log("节点信息:", nodeInfo);
        } catch (err) {
          console.warn("获取节点信息失败:", err);
        }
        
      } catch (err) {
        console.error("连接错误:", err);
        setError("网络连接失败，请检查网络设置");
      }
    };

    initTronWeb();
  }, []);

  const addController = () => {
    if (controllers.length < 5) {
      setControllers([...controllers, ""]);
    }
  };

  const removeController = (index) => {
    const newControllers = controllers.filter((_, i) => i !== index);
    setControllers(newControllers);
    if (threshold > newControllers.length) {
      setThreshold(newControllers.length);
    }
  };

  const updateController = (index, value) => {
    const newControllers = [...controllers];
    newControllers[index] = value;
    setControllers(newControllers);
  };

  // Original setMultiSignPermission function remains the same
  const setMultiSignPermission = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      
      if (!window.tronWeb || !window.tronWeb.ready || !window.tronWeb.defaultAddress.base58) {
        throw new Error("请确保TronLink已连接并解锁账户");
      }

      const tronWeb = window.tronWeb;

      if (!targetAddress || !tronWeb.isAddress(targetAddress)) {
        throw new Error("被控制地址格式不正确");
      }

      const validControllers = controllers.filter(addr => addr && tronWeb.isAddress(addr));
      if (validControllers.length === 0) {
        throw new Error("请至少添加一个有效的控制地址");
      }
      
      if (validControllers.length < threshold) {
        throw new Error("有效控制地址数量少于所需签名数");
      }

      const updateParams = {
        owner_address: tronWeb.address.toHex(targetAddress),
        owner: {
          type: 0,
          permission_name: 'owner',
          threshold: threshold,
          keys: validControllers.map(address => ({
            address: tronWeb.address.toHex(address),
            weight: 1
          }))
        },
        actives: [{
          type: 2,
          permission_name: 'active',
          threshold: threshold,
          operations: "7fff1fc0033e0300000000000000000000000000000000000000000000000000",
          keys: validControllers.map(address => ({
            address: tronWeb.address.toHex(address),
            weight: 1
          }))
        }]
      };

      console.log("更新参数:", updateParams);

      const transaction = await tronWeb.fullNode.request(
        '/wallet/accountpermissionupdate',
        updateParams,
        'post'
      );

      if (!transaction || !transaction.txID) {
        throw new Error("创建交易失败");
      }

      console.log("交易创建成功:", transaction);

      const now = Date.now();
      transaction.expiration = now + 60 * 1000;
      transaction.timestamp = now;

      const signedTx = await tronWeb.trx.sign(transaction);
      console.log("交易已签名:", signedTx);
      
      const receipt = await tronWeb.trx.sendRawTransaction(signedTx);
      console.log("交易广播结果:", receipt);
      
      if (receipt.result) {
        setSuccess(`多签权限设置成功! 交易ID: ${transaction.txID}`);
        return;
      }
      throw new Error("交易被拒绝");

    } catch (err) {
      console.error("设置多签权限错误:", err);
      setError(err.message || "设置失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <Shield className="w-12 h-12 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">TRON多签权限设置</h1>
                <p className="text-blue-100 mt-1">安全可靠的多重签名管理工具</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Status Messages */}
            {error && (
              <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="flex items-center space-x-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {/* Target Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  被控制地址
                </label>
                <input
                  type="text"
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  placeholder="输入需要设置多签的地址"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              {/* Controllers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  控制地址列表
                </label>
                <div className="space-y-3">
                  {controllers.map((controller, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={controller}
                        onChange={(e) => updateController(index, e.target.value)}
                        placeholder={`控制地址 ${index + 1}`}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                      {controllers.length > 1 && (
                        <button
                          onClick={() => removeController(index)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {controllers.length < 5 && (
                    <button
                      onClick={addController}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition duration-200"
                    >
                      <Plus className="w-5 h-5" />
                      <span>添加地址</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Threshold */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所需签名数
                </label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(Math.min(parseInt(e.target.value) || 1, controllers.length))}
                  min={1}
                  max={controllers.length}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={setMultiSignPermission}
                disabled={loading}
                className={`w-full px-6 py-4 rounded-lg text-white font-medium transition duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]'
                }`}
              >
                {loading ? "设置中..." : "设置多签权限"}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                作者 @xkbfdl • 有zjp,cx项目能出货的，可以考虑和我联系 • 欢迎中介技术和我对接
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TronPermissionSetter;
